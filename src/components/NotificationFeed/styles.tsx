import styled from "@emotion/styled";
import * as theme from "../../theme";

export const Header = styled.header`
  padding: ${`${theme.spacing[3]} ${theme.spacing[4]}`};
  height: 42px;
  display: flex;
  align-items: center;
`;

export const Selector = styled.div`
  display: flex;
  align-items: center;
`;

export const SelectWrapper = styled.div`
  font-size: ${theme.fontSizes.md};
  font-weight: ${theme.fontWeights.medium};
  position: relative;
  color: ${theme.colors.gray[400]};

  select {
    padding-right: ${theme.spacing[3]};
    color: currentColor;
    border: none;
    background: none;
    appearance: none;
    font-size: ${theme.fontSizes.sm};
  }

  svg {
    position: absolute;
    top: 50%;
    margin-top: -2px;
    right: 0;
  }
`;

export const Type = styled.span`
  font-size: ${theme.fontSizes.sm};
  font-weight: ${theme.fontWeights.medium};
  color: ${theme.colors.gray[900]};
  margin-right: ${theme.spacing[2]};
`;

export const SpinnerContainer = styled.div`
  padding: ${`${theme.spacing[1]} ${theme.spacing[4]}`};

  svg {
    margin: 0 auto;
    display: block;
  }
`;

export const Container = styled.div`
  height: calc(100% - 42px);
  overflow-y: auto;
`;
