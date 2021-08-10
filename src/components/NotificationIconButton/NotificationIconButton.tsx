import React, { SyntheticEvent } from "react";
import { BellIcon } from "../Icons";
import { UnseenBadge } from "../UnseenBadge";

import "./styles.css";

export interface NotificationIconButtonProps {
  onClick: (e: SyntheticEvent) => void;
}

export const NotificationIconButton = React.forwardRef<
  HTMLButtonElement,
  NotificationIconButtonProps
>(({ onClick }, ref) => (
  <button className="rnf-notification-icon-button" ref={ref} onClick={onClick}>
    <BellIcon />
    <UnseenBadge />
  </button>
));
