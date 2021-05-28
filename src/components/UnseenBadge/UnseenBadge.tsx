import React from "react";
import styled from "@emotion/styled";
import { useKnockFeed } from "../KnockFeedProvider";
import { formatBadgeCount } from "../../utils";
import * as theme from "../../theme";

export const UnseenBadge = () => {
  const { useFeedStore } = useKnockFeed();
  const unseenCount = useFeedStore((state) => state.metadata.unseen_count);

  return unseenCount !== 0 ? (
    <Container>
      <Count>{formatBadgeCount(unseenCount)}</Count>
    </Container>
  ) : null;
};

const Container = styled.div`
  background-color: ${theme.colors.red[500]};
  width: ${theme.spacing[4]};
  height: ${theme.spacing[4]};
  border-radius: ${theme.spacing[4]};
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0px;
  right: 0px;
`;

const Count = styled.span`
  font-size: 9px;
  font-weight: ${theme.fontWeights.medium};
  color: ${theme.colors.common.white};
  margin-top: -1px;
`;
