import * as React from "react";
import { useKnockFeed } from "../KnockFeedProvider";
import { CheckmarkCircle } from "../Icons";

import "./styles.css";

export const MarkAsRead = () => {
  const { useFeedStore, feedClient } = useKnockFeed();

  const unreadItems = useFeedStore((state) =>
    state.items.filter((item) => !item.read_at)
  );

  const unreadCount = useFeedStore((state) => state.metadata.unread_count);

  const onClick = React.useCallback(() => {
    feedClient.markAsRead(unreadItems);
  }, [feedClient, unreadItems]);

  return (
    <button
      className="rnf-mark-all-as-read"
      disabled={unreadCount === 0}
      onClick={onClick}
    >
      Mark all as read
      <CheckmarkCircle />
    </button>
  );
};
