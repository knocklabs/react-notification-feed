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
  children?: ReactNode;
  archiveButton?: ReactNode;
}

type BlockByName = {
  [name: string]: ContentBlock;
};

export const NotificationCell = React.forwardRef<
  HTMLDivElement,
  NotificationCellProps
>(({ item, onItemClick, avatar, children, archiveButton }, ref) => {
  const { feedClient, colorMode } = useKnockFeed();

  const blocksByName: BlockByName = useMemo(() => {
    return item.blocks.reduce((acc, block) => {
      return { ...acc, [block.name]: block };
    }, {});
  }, [item]);

  const actionUrl = blocksByName.action_url && blocksByName.action_url.rendered;

  const onClick = React.useCallback(() => {
    // Mark as interacted + read once we click the item
    feedClient.markAsInteracted(item);

    if (onItemClick) return onItemClick(item);

    // Delay when we navigate, until we've actually issued our API call.
    setTimeout(() => {
      window.location.assign(actionUrl);
    }, 200);
  }, [item]);

  const onKeyDown = React.useCallback(
    (ev: React.KeyboardEvent<HTMLDivElement>) => {
      switch (ev.key) {
        case "Enter": {
          ev.stopPropagation();
          onClick();
          break;
        }
        default:
          break;
      }
    },
    [onClick]
  );

  const actor = item.actors[0];

  return (
    <div
      ref={ref}
      className={`rnf-notification-cell rnf-notification-cell--${colorMode}`}
      onClick={onClick}
      onKeyDown={onKeyDown}
      tabIndex={0}
    >
      <div className="rnf-notification-cell__inner">
        {!item.read_at && <div className="rnf-notification-cell__unread-dot" />}

        {renderNodeOrFallback(
          avatar,
          actor && ("name" in actor) && actor.name && (
            <Avatar name={actor.name} src={actor.avatar} />
          )
        )}

        <div className="rnf-notification-cell__content-outer">
          {blocksByName.body && (
            <div
              className="rnf-notification-cell__content"
              dangerouslySetInnerHTML={{ __html: blocksByName.body.rendered }}
            />
          )}

          {children && (
            <div className="rnf-notification-cell__child-content">
              {children}
            </div>
          )}

          <span className="rnf-notification-cell__timestamp">
            {formatTimestamp(item.inserted_at)}
          </span>
        </div>

        {renderNodeOrFallback(archiveButton, <ArchiveButton item={item} />)}
      </div>
    </div>
  );
});
