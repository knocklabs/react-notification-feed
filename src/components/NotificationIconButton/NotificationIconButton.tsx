import React, { SyntheticEvent } from "react";
import { BellIcon } from "../Icons";
import { useKnockFeed } from "../KnockFeedProvider";
import { BadgeCountType, UnseenBadge } from "../UnseenBadge";

import "./styles.css";

export interface NotificationIconButtonProps {
  // What value should we use to drive the badge count?
  badgeCountType?: BadgeCountType;
  onClick: (e: SyntheticEvent) => void;
}

export const NotificationIconButton = React.forwardRef<
  HTMLButtonElement,
  NotificationIconButtonProps
>(({ onClick, badgeCountType }, ref) => {
  const { colorMode } = useKnockFeed();

  return (
    <button
      className={`rnf-notification-icon-button rnf-notification-icon-button--${colorMode}`}
      ref={ref}
      onClick={onClick}
    >
      <BellIcon />
      <UnseenBadge badgeCountType={badgeCountType} />
    </button>
  );
});
