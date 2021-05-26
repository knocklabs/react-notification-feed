import React, { useMemo } from "react";
import styled from "@emotion/styled";
import { ContentBlock, FeedItem } from "@knocklabs/client";
import { formatTimestamp } from "../../utils";
import { Avatar } from "./Avatar";
import { useKnockFeed } from "../KnockFeedProvider";

export interface NotificationCellProps {
  item: FeedItem;
  onItemClick?: (item: FeedItem) => void;
}

type BlockByName = {
  [name: string]: ContentBlock;
};

export const NotificationCell = React.forwardRef<
  HTMLDivElement,
  NotificationCellProps
>(({ item, onItemClick }, ref) => {
  const { feedClient } = useKnockFeed();

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

  const hasActors = item.total_actors > 0;
  const actor = hasActors && item.actors[0];

  return (
    <Container ref={ref}>
      <InnerContainer onClick={onClick}>
        {!item.read_at && <UnreadDot />}

        {actor && <Avatar name={actor.name} src={(actor as any).avatar} />}
        <Content>
          {blocksByName.body && (
            <BodyContent
              dangerouslySetInnerHTML={{ __html: blocksByName.body.rendered }}
            />
          )}

          <Timestamp>{formatTimestamp(item.inserted_at)}</Timestamp>
        </Content>
      </InnerContainer>
    </Container>
  );
});

const Container = styled.div`
  position: relative;
  border-bottom: 1px solid rgba(55, 53, 47, 0.09);
`;

const InnerContainer = styled.button`
  background-color: transparent;
  border: none;
  appearance: none;
  margin: 0;
  width: 100%;
  text-decoration: none;
  display: flex;
  padding: ${({ theme }) => theme.spacing[3]};
  cursor: pointer;
  text-align: left;

  &:hover,
  &:focus,
  &:active {
    background-color: #f1f6fc;
    outline: none;
  }
`;

const UnreadDot = styled.div`
  position: absolute;
  top: 6px;
  left: 6px;
  width: 6px;
  height: 6px;
  border-radius: 6px;
  background-color: ${({ theme }) => theme.colors.brand[100]};
`;

const Content = styled.div`
  margin-left: ${({ theme }) => theme.spacing[3]};
`;

const BodyContent = styled.div`
  color: ${({ theme }) => theme.colors.gray[900]};
  display: block;
  font-weight: ${({ theme }) => theme.fontWeights.normal};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  line-height: ${({ theme }) => theme.fontSizes.xl};
  margin-bottom: ${({ theme }) => theme.spacing[1]};

  h1,
  h2,
  h3,
  h4 {
    font-weight: ${({ theme }) => theme.fontWeights.semibold};
    margin-bottom: 0.5em;
  }

  h1 {
    font-size: ${({ theme }) => theme.fontSizes["2xl"]};
  }

  h2 {
    font-size: ${({ theme }) => theme.fontSizes.xl};
  }

  h3 {
    font-size: ${({ theme }) => theme.fontSizes.lg};
  }

  h4 {
    font-size: ${({ theme }) => theme.fontSizes.md};
  }

  p {
    margin: 0 0 0.75em 0;

    &::last-child {
      margin-bottom: 0;
    }
  }

  blockquote {
    border-left: 3px solid ${({ theme }) => theme.colors.gray[200]};
    padding-left: ${({ theme }) => theme.spacing[2]};
    line-height: ${({ theme }) => theme.fontSizes["xl"]};
    margin: 0;
  }

  strong {
    font-weight: ${({ theme }) => theme.fontWeights.semibold};
  }
`;

const Timestamp = styled.span`
  display: block;
  color: ${({ theme }) => theme.colors.gray[300]};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.normal};
  line-height: ${({ theme }) => theme.fontSizes.lg};
`;
