import React, { SyntheticEvent } from "react";
import styled from "@emotion/styled";
import BellIcon from "../Icons/Bell";
import UnseenBadge from "../UnseenBadge";

type Props = {
  onClick: (e: SyntheticEvent) => void;
};

const NotificationBadge = React.forwardRef<HTMLButtonElement, Props>(
  ({ onClick }, ref) => {
    return (
      <NotificationButton ref={ref} onClick={onClick}>
        <BellIcon />
        <UnseenBadge />
      </NotificationButton>
    );
  }
);

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

export default NotificationBadge;
