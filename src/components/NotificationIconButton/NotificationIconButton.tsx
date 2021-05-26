import React, { SyntheticEvent } from "react";
import styled from "@emotion/styled";
import { BellIcon } from "../Icons";
import { UnseenBadge } from "../UnseenBadge";

export interface NotificationIconButtonProps {
  onClick: (e: SyntheticEvent) => void;
}

export const NotificationIconButton = React.forwardRef<
  HTMLButtonElement,
  NotificationIconButtonProps
>(({ onClick }, ref) => {
  return (
    <NotificationButton ref={ref} onClick={onClick}>
      <BellIcon />
      <UnseenBadge />
    </NotificationButton>
  );
});

const NotificationButton = styled.button`
  background-color: transparent;
  border: none;
  position: relative;
  display: block;
  margin: 0;
  padding: 0;
  cursor: pointer;
  width: 32px;
  height: 32px;
  color: inherit;

  svg {
    display: block;
    margin: 0 auto;
  }
`;
