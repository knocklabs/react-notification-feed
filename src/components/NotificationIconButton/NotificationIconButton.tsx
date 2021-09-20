import React, { SyntheticEvent } from "react";
import { BellIcon } from "../Icons";
import { useKnockFeed } from "../KnockFeedProvider";
import { UnseenBadge } from "../UnseenBadge";

import "./styles.css";

export interface NotificationIconButtonProps {
  onClick: (e: SyntheticEvent) => void;
}

export const NotificationIconButton = React.forwardRef<
  HTMLButtonElement,
  NotificationIconButtonProps
>(({ onClick }, ref) => {
  const { colorMode } = useKnockFeed();

  return (
    <button
      className={`rnf-notification-icon-button rnf-notification-icon-button--${colorMode}`}
      ref={ref}
      onClick={onClick}
    >
      <BellIcon />
      <UnseenBadge />
    </button>
  );
});
