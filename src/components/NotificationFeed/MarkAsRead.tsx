import styled from "@emotion/styled";
import * as React from "react";
import { useKnockFeed } from "../KnockFeedProvider";
import { CheckmarkCircle } from "../Icons";

const MarkAllAsRead = styled.button`
  border: none;
  background: transparent;
  margin-left: auto;
  display: flex;
  align-items: center;
  padding: 0;
  color: ${({ theme }) => theme.colors.gray[400]};
  cursor: pointer;

  svg {
    margin-left: ${({ theme }) => theme.spacing[1]};
  }

  &:disabled {
    color: ${({ theme }) => theme.colors.gray[200]};
    cursor: not-allowed;
  }
`;

export const MarkAsRead = () => {
  const { useFeedStore, feedClient } = useKnockFeed();

  const unreadItems = useFeedStore((state) =>
    state.items.filter((item) => !item.read_at)
  );

  const unreadCount = useFeedStore((state) => state.metadata.unread_count);

  const onClick = React.useCallback(() => {
    feedClient.markAsRead(unreadItems);
  }, [feedClient, unreadItems]);

  return (
    <MarkAllAsRead disabled={unreadCount === 0} onClick={onClick}>
      Mark all as read
      <CheckmarkCircle />
    </MarkAllAsRead>
  );
};
