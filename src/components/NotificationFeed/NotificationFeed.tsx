import { FeedItem, isRequestInFlight, NetworkStatus } from "@knocklabs/client";
import React, { ReactNode, useCallback, useEffect, useRef } from "react";
import { EmptyFeed } from "../EmptyFeed";
import { useKnockFeed } from "../KnockFeedProvider";
import { Spinner } from "../Spinner";
import { NotificationCell } from "../NotificationCell";
import { MarkAsRead } from "./MarkAsRead";
import Dropdown from "./Dropdown";
import { FilterStatus, FilterStatusToLabel } from "../../constants";

import "./styles.css";
import useOnBottomScroll from "../../hooks/useOnBottomScroll";

export type OnNotificationClick = (item: FeedItem) => void;
export type RenderItem = ({ item }: RenderItemProps) => ReactNode;
export type RenderItemProps = {
  item: FeedItem;
  onItemClick?: OnNotificationClick;
};

export interface NotificationFeedProps {
  EmptyComponent?: ReactNode;
  renderItem?: RenderItem;
  onNotificationClick?: OnNotificationClick;
  onMarkAllAsReadClick?: (e: React.MouseEvent, unreadItems: FeedItem[]) => void;
  isVisible: boolean;
}

const defaultRenderItem = (props: RenderItemProps) => (
  <NotificationCell key={props.item.id} {...props} />
);

export const NotificationFeed: React.FC<NotificationFeedProps> = ({
  EmptyComponent = <EmptyFeed />,
  renderItem = defaultRenderItem,
  onNotificationClick,
  onMarkAllAsReadClick,
  isVisible = false,
}) => {
  const {
    status,
    setStatus,
    feedClient,
    useFeedStore,
    colorMode,
  } = useKnockFeed();

  const pageInfo = useFeedStore((state) => state.pageInfo);
  const items = useFeedStore((state) => state.items);
  const networkStatus = useFeedStore((state) => state.networkStatus);
  const unseenItems = useFeedStore((state) =>
    state.items.filter((item) => !item.seen_at)
  );

  const containerRef = useRef<HTMLDivElement>(null);
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

  useEffect(() => {
    if (isVisible && unseenItems.length > 0) {
      feedClient.markAsSeen(unseenItems);
    }
  }, [isVisible]);

  const renderSpinner = () => (
    <div className="rnf-notification-feed__spinner-container">
      <Spinner
        thickness={3}
        size="16px"
        color={colorMode === "dark" ? "rgba(255, 255, 255, 0.65)" : undefined}
      />
    </div>
  );

  return (
    <div
      className={`rnf-notification-feed rnf-notification-feed--${colorMode}`}
    >
      <header className="rnf-notification-feed__header">
        <div className="rnf-notification-feed__selector">
          <span className="rnf-notification-feed__type">Notifications</span>
          <Dropdown value={status} onChange={(e) => setStatus(e.target.value)}>
            {[FilterStatus.All, FilterStatus.Unread, FilterStatus.Unseen].map(
              (state) => (
                <option key={state} value={state}>
                  {FilterStatusToLabel[state]}
                </option>
              )
            )}
          </Dropdown>
        </div>
        <MarkAsRead onClick={onMarkAllAsReadClick} />
      </header>

      <div className="rnf-notification-feed__container" ref={containerRef}>
        {networkStatus === NetworkStatus.loading && renderSpinner()}

        <div className="rnf-notification-feed__feed-items-container">
          {networkStatus !== NetworkStatus.loading &&
            items.map((item: FeedItem) =>
              renderItem({ item, onItemClick: onNotificationClick })
            )}
        </div>

        {networkStatus === NetworkStatus.fetchMore && renderSpinner()}

        {!requestInFlight && noItems && EmptyComponent}
      </div>
    </div>
  );
};
