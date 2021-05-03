import styled from "@emotion/styled";
import { StoreState } from "@knocklabs/client";
import * as React from "react";
import { palette } from "../../theme";
import { useFeedProviderState } from "../FeedProvider/FeedProvider";
import CheckmarkCircle from "../Icons/CheckmarkCircle";

export const MarkAllAsRead = styled.button`
  border: none;
  background: transparent;
  margin-left: auto;
  display: flex;
  align-items: center;
  padding: 0;
  color: ${palette.grey["500"]};
  cursor: pointer;

  svg {
    margin-left: 4px;
  }

  &:disabled {
    color: #dddee1;
  }
`;

const MarkAsRead = () => {
  const { useFeedStore, feedClient } = useFeedProviderState();
  const unreadCount = useFeedStore(
    (state: StoreState) => state.metadata.unread_count
  );

  const onClick = React.useCallback(() => {
    // This should do an optimistic update
    // feedClient.markAllAsRead();
  }, []);

  return (
    <MarkAllAsRead disabled={unreadCount.length === 0} onClick={onClick}>
      Mark all as read
      <CheckmarkCircle />
    </MarkAllAsRead>
  );
};

export default MarkAsRead;
