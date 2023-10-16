import { FeedItem, isRequestInFlight, NetworkStatus } from "@knocklabs/client";
import React, {
  ReactElement,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { EmptyFeed } from "../EmptyFeed";
import { useKnockFeed } from "../KnockFeedProvider";
import { Spinner } from "../Spinner";
import { NotificationCell } from "../NotificationCell";
import { ColorMode, FilterStatus } from "../../constants";
import {
  NotificationFeedHeader,
  NotificationFeedHeaderProps,
} from "./NotificationFeedHeader";

import "./styles.css";
import useOnBottomScroll from "../../hooks/useOnBottomScroll";
import useFeedSettings from "../../hooks/useFeedSettings";
import { useTranslations } from "../../hooks/useTranslations";
import { renderNodeOrFallback } from "../../utils";

export type OnNotificationClick = (item: FeedItem) => void;
export type RenderItem = ({ item }: RenderItemProps) => ReactNode;
export type RenderItemProps = {
  item: FeedItem;
  onItemClick?: OnNotificationClick;
};

export interface NotificationFeedProps {
  EmptyComponent?: ReactNode;
  header?: ReactElement<any>;
  renderItem?: RenderItem;
  onNotificationClick?: OnNotificationClick;
  onMarkAllAsReadClick?: (e: React.MouseEvent, unreadItems: FeedItem[]) => void;
  initialFilterStatus?: FilterStatus;
}

const defaultRenderItem = (props: RenderItemProps) => (
  <NotificationCell key={props.item.id} {...props} />
);

const LoadingSpinner = ({ colorMode }: { colorMode: ColorMode }) => (
  <div className="rnf-notification-feed__spinner-container">
    <Spinner
      thickness={3}
      size="16px"
      color={colorMode === "dark" ? "rgba(255, 255, 255, 0.65)" : undefined}
    />
  </div>
);

const poweredByKnockUrl =
  "https://knock.app?utm_source=powered-by-knock&utm_medium=referral&utm_campaign=knock-branding-feed";

export const NotificationFeed: React.FC<NotificationFeedProps> = ({
  EmptyComponent = <EmptyFeed />,
  renderItem = defaultRenderItem,
  onNotificationClick,
  onMarkAllAsReadClick,
  initialFilterStatus = FilterStatus.All,
  header,
}) => {
  const [status, setStatus] = useState(initialFilterStatus);
  const { feedClient, useFeedStore, colorMode } = useKnockFeed();
  const { settings } = useFeedSettings(feedClient);
  const { t } = useTranslations();

  const { pageInfo, items, networkStatus } = useFeedStore();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setStatus(initialFilterStatus);
  }, [initialFilterStatus]);

  useEffect(() => {
    // When the feed client changes, or the status changes issue a re-fetch
    feedClient.fetch({ status });
  }, [feedClient, status]);

  const noItems = items.length === 0;
  const requestInFlight = isRequestInFlight(networkStatus);

  // Handle fetching more once we reach the bottom of the list
  const onBottomCallback = useCallback(() => {
    if (!requestInFlight && pageInfo.after) {
      feedClient.fetchNextPage();
    }
  }, [requestInFlight, pageInfo, feedClient]);

  // Once we scroll to the bottom of the view we want to automatically fetch
  // more items for the feed and bring them into the list
  useOnBottomScroll({
    ref: containerRef,
    callback: onBottomCallback,
    offset: 70,
  });

  return (
    <div
      className={`rnf-notification-feed rnf-notification-feed--${colorMode}`}
    >
      {renderNodeOrFallback(
        header,
        <NotificationFeedHeader
          onMarkAllAsReadClick={onMarkAllAsReadClick}
          filterStatus={status}
          setFilterStatus={setStatus}
        />
      )}

      <div className="rnf-notification-feed__container" ref={containerRef}>
        {networkStatus === NetworkStatus.loading && (
          <LoadingSpinner colorMode={colorMode} />
        )}

        <div className="rnf-notification-feed__feed-items-container">
          {networkStatus !== NetworkStatus.loading &&
            items.map((item: FeedItem) =>
              renderItem({ item, onItemClick: onNotificationClick })
            )}
        </div>

        {networkStatus === NetworkStatus.fetchMore && (
          <LoadingSpinner colorMode={colorMode} />
        )}

        {!requestInFlight && noItems && EmptyComponent}
      </div>

      {settings?.features.branding_required && (
        <div className="rnf-notification-feed__knock-branding">
          <a href={poweredByKnockUrl} target="_blank">
            {t("poweredBy")}
          </a>
        </div>
      )}
    </div>
  );
};
