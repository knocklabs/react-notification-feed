import React, { useMemo } from "react";
import styled from "@emotion/styled";
import { ContentBlock, FeedItem } from "@knocklabs/client";
import { spacing, fontSizes, palette } from "../../theme";
import { formatTimestamp } from "../../utils";
import Avatar from "./Avatar";
import { useFeedProviderState } from "../FeedProvider";

type Props = {
  item: FeedItem;
  onItemClick?: (item: FeedItem) => void;
};

type BlockByName = {
  [name: string]: ContentBlock;
};

const MessageCell: React.FC<Props> = ({ item, onItemClick }) => {
  const { feedClient } = useFeedProviderState();

  const blocksByName: BlockByName = useMemo(() => {
    return item.blocks.reduce((acc, block) => {
      return { ...acc, [block.name]: block };
    }, {});
  }, [item]);

  const actionUrl = blocksByName.action_url && blocksByName.action_url.rendered;

  const onClick = React.useCallback(() => {
    // Mark as read
    // feedClient.markAsRead(item);

    if (onItemClick) {
      onItemClick(item);
    } else {
      window.location.assign(actionUrl);
    }
  }, [item]);

  const hasActors = item.total_actors > 0;
  const actor = hasActors && item.actors[0];

  return (
    <Container>
      <InnerContainer onClick={onClick}>
        {!item.read_at && <UnreadDot />}

        {actor && <Avatar name={actor.name} src={(actor as any).avatar} />}
        <Content>
          {blocksByName.body && (
            <BodyContent
              dangerouslySetInnerHTML={{ __html: blocksByName.body.rendered }}
            />
          )}

          <Timestamp>
            {blocksByName.timestamp
              ? blocksByName.timestamp.rendered
              : formatTimestamp(item.inserted_at)}
          </Timestamp>
        </Content>
      </InnerContainer>
    </Container>
  );
};

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
  padding: ${spacing.medium};
  cursor: pointer;
  text-align: left;

  &:hover,
  &:active {
    background-color: #f1f6fc;
  }
`;

const UnreadDot = styled.div`
  position: absolute;
  top: ${spacing.xsmall};
  left: ${spacing.xsmall};
  width: ${spacing.xsmall};
  height: ${spacing.xsmall};
  border-radius: ${spacing.xsmall};
  background-color: ${palette.blue[200]};
`;

const Content = styled.div`
  margin-left: ${spacing.medium};
`;

const BodyContent = styled.div`
  color: ${palette.common.black};
  display: block;
  font-size: ${fontSizes.small};
  line-height: ${fontSizes.large};
  margin-bottom: ${spacing.xxsmall};

  p {
    margin-top: 0;
  }

  strong {
    font-weight: 600;
  }

  blockquote {
    margin: 0;
    padding: 0;
  }
`;

const Timestamp = styled.span`
  display: block;
  color: ${palette.grey["200"]};
  font-size: ${fontSizes.small};
  font-weight: 500;
  line-height: 20px;
`;

export default MessageCell;
