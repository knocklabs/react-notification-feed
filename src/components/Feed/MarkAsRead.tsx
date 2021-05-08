import styled from "@emotion/styled";
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

  const unreadItems = useFeedStore((state) =>
    state.items.filter((item) => !item.read_at)
  );

  const unreadCount = useFeedStore((state) => state.metadata.unread_count);

  const onClick = React.useCallback(() => {
    feedClient.markAsRead(unreadItems);
  }, []);

  return (
    <MarkAllAsRead disabled={unreadCount === 0} onClick={onClick}>
      Mark all as read
      <CheckmarkCircle />
    </MarkAllAsRead>
  );
};

export default MarkAsRead;
