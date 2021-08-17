import React, { useMemo } from "react";
import { ContentBlock, FeedItem } from "@knocklabs/client";
import { formatTimestamp } from "../../utils";
import { Avatar } from "./Avatar";
import { useKnockFeed } from "../KnockFeedProvider";

import "./styles.css";

export interface NotificationCellProps {
  item: FeedItem;
  onItemClick?: (item: FeedItem) => void;
}

type BlockByName = {
  [name: string]: ContentBlock;
};

export const NotificationCell = React.forwardRef<
  HTMLDivElement,
  NotificationCellProps
>(({ item, onItemClick }, ref) => {
  const { feedClient } = useKnockFeed();

  const blocksByName: BlockByName = useMemo(() => {
    return item.blocks.reduce((acc, block) => {
      return { ...acc, [block.name]: block };
    }, {});
  }, [item]);

  const actionUrl = blocksByName.action_url && blocksByName.action_url.rendered;

  const onClick = React.useCallback(() => {
    // Mark as read once we click the item
    feedClient.markAsRead(item);

    if (onItemClick) {
      onItemClick(item);
    } else {
      window.location.assign(actionUrl);
    }
  }, [item]);

  const hasActors = item.total_actors > 0;
  const actor = hasActors && item.actors[0];

  return (
    <div ref={ref} className="rnf-notification-cell">
      <button onClick={onClick} className="rnf-notification-cell__inner">
        {!item.read_at && <div className="rnf-notification-cell__unread-dot" />}

        {actor && <Avatar name={actor.name} src={(actor as any).avatar} />}
        <div className="rnf-notification-cell__content-outer">
          {blocksByName.body && (
            <div
              className="rnf-notification-cell__content"
              dangerouslySetInnerHTML={{ __html: blocksByName.body.rendered }}
            />
          )}

          <span className="rnf-notification-cell__timestamp">
            {formatTimestamp(item.inserted_at)}
          </span>
        </div>
      </button>
    </div>
  );
});
