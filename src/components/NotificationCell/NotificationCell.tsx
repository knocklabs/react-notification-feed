import React, { ReactNode, useMemo } from "react";
import { ContentBlock, FeedItem } from "@knocklabs/client";
import { Avatar } from "./Avatar";
import { ArchiveButton } from "./ArchiveButton";
import { useKnockFeed } from "../KnockFeedProvider";
import { formatTimestamp, renderNodeOrFallback } from "../../utils";

import "./styles.css";

export interface NotificationCellProps {
  item: FeedItem;
  onItemClick?: (item: FeedItem) => void;
  avatar?: ReactNode;
}

type BlockByName = {
  [name: string]: ContentBlock;
};

export const NotificationCell = React.forwardRef<
  HTMLDivElement,
  NotificationCellProps
>(({ item, onItemClick, avatar }, ref) => {
  const { feedClient, colorMode } = useKnockFeed();

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

  const actor = item.actors[0];

  return (
    <div
      ref={ref}
      className={`rnf-notification-cell rnf-notification-cell--${colorMode}`}
    >
      <div onClick={onClick} className="rnf-notification-cell__inner">
        {!item.read_at && <div className="rnf-notification-cell__unread-dot" />}

        {renderNodeOrFallback(
          avatar,
          actor && <Avatar name={actor.name} src={actor.avatar} />
        )}

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

        <ArchiveButton item={item} />
      </div>
    </div>
  );
});
