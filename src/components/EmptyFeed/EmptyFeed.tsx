import React from "react";
import styled from "@emotion/styled";
import * as theme from "../../theme";

export const EmptyFeed = () => (
  <Container>
    <Inner>
      <Header>No notifications yet</Header>
      <Body>We'll let you know when we've got something new for you.</Body>
    </Inner>

    <PoweredBy
      href="https://knock.app?utm_source=in-app-feed&utml_medium=in-app-feed&utm_campaign=in-app-feed"
      target="_blank"
    >
      Powered by Knock
    </PoweredBy>
  </Container>
);

const Container = styled.section`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const Inner = styled.div`
  max-width: 240px;
  margin: -20px auto 0;
  text-align: center;
`;

const Header = styled.h2`
  font-size: ${theme.fontSizes.md};
  font-weight: ${theme.fontWeights.medium};
  margin: 0 0 ${theme.spacing[1]};
`;

const Body = styled.p`
  font-size: ${theme.fontSizes.sm};
  color: ${theme.colors.gray[300]};
  margin: 0;
`;

const PoweredBy = styled.a`
  font-size: ${theme.fontSizes.xs};
  font-weight: ${theme.fontWeights.medium};
  color: ${theme.colors.gray[200]};
  text-decoration: none;
  position: absolute;
  bottom: ${theme.spacing[2]};
`;
