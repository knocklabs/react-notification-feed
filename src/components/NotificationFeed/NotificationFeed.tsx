import { FeedItem } from "@knocklabs/client";
import React, { ReactNode, useEffect } from "react";
import { EmptyFeed } from "../EmptyFeed";
import { useKnockFeed } from "../KnockFeedProvider";
import { Spinner } from "../Spinner";
import { NotificationCell } from "../NotificationCell";
import { MarkAsRead } from "./MarkAsRead";
import Dropdown from "./Dropdown";
import { FilterStatus } from "../../constants";

import "./styles.css";

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
  isVisible: boolean;
}

const defaultRenderItem = (props: RenderItemProps) => (
  <NotificationCell key={props.item.id} {...props} />
);

export const NotificationFeed = React.forwardRef<
  HTMLDivElement,
  NotificationFeedProps
>(
  (
    {
      EmptyComponent = <EmptyFeed />,
      renderItem = defaultRenderItem,
      onNotificationClick,
      isVisible = false,
    },
    ref
  ) => {
    const { status, setStatus, feedClient, useFeedStore } = useKnockFeed();
    const items = useFeedStore((state) => state.items);
    const unseenItems = useFeedStore((state) =>
      state.items.filter((item) => !item.seen_at)
    );
    const loading = useFeedStore((state) => state.loading);
    const noItems = items.length === 0;

    useEffect(() => {
      if (isVisible) {
        feedClient.markAsSeen(unseenItems);
      }
    }, [isVisible]);

    return (
      <>
        <header className="rnf-notification-feed__header">
          <div className="rnf-notification-feed__selector">
            <span className="rnf-notification-feed__type">Notifications</span>
            <Dropdown
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              {[FilterStatus.All, FilterStatus.Unread, FilterStatus.Unseen].map(
                (state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                )
              )}
            </Dropdown>
          </div>
          <MarkAsRead />
        </header>

        <div className="rnf-notification-feed__container" ref={ref}>
          {loading && (
            <div className="rnf-notification-feed__spinner-container">
              <Spinner thickness={3} size="16px" />
            </div>
          )}

          {!loading &&
            items.map((item: FeedItem) =>
              renderItem({ item, onItemClick: onNotificationClick })
            )}

          {!loading && noItems && EmptyComponent}
        </div>
      </>
    );
  }
);
