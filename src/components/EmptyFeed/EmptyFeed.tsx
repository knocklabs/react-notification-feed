import React from "react";
import styled from "@emotion/styled";
import BellIcon from "../Icons/Bell";
import { fontSizes, palette } from "../../theme";

const EmptyFeed = () => (
  <Container>
    <Inner>
      <BellIcon />
      <Header>No notifications yet</Header>
      <Body>We'll let you know when we've got something new for you.</Body>
    </Inner>
  </Container>
);

const Container = styled.section`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 32px;
    height: 32px;
    color: ${palette.grey["300"]};
    margin-bottom: 8px;
  }
`;

const Inner = styled.div`
  max-width: 240px;
  margin: 0 auto;
  text-align: center;
`;

const Header = styled.h2`
  font-size: 16px;
  font-weight: 500;
  margin: 0 0 5px;
`;

const Body = styled.p`
  font-size: ${fontSizes.small};
  color: ${palette.grey["300"]};
  margin: 0;
`;

export default EmptyFeed;
