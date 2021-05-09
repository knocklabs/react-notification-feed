import React from "react";
import styled from "@emotion/styled";
import { useKnockFeed } from "../FeedProvider";
import { formatBadgeCount } from "../../utils";
import { palette } from "../../theme";

const UnseenBadge = () => {
  const { useFeedStore } = useKnockFeed();
  const unseenCount = useFeedStore((state) => state.metadata.unseen_count);

  return unseenCount !== 0 ? (
    <Container>
      <Count>{formatBadgeCount(unseenCount)}</Count>
    </Container>
  ) : null;
};

const Container = styled.div`
  background-color: ${palette.red["200"]};
  width: 16px;
  height: 16px;
  border-radius: 16px;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0px;
  right: 0px;
`;

const Count = styled.span`
  font-size: 9px;
  font-weight: 500;
  color: ${palette.common.white};
  margin-top: -1px;
`;

export default UnseenBadge;
