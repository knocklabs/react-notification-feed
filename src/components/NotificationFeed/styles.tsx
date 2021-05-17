import styled from "@emotion/styled";

export const Header = styled.header`
  padding: ${({ theme }) => `${theme.spacing[3]} ${theme.spacing[4]}`};
  height: 42px;
  display: flex;
  align-items: center;
`;

export const Selector = styled.div`
  display: flex;
  align-items: center;
`;

export const SelectWrapper = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  position: relative;
  color: ${({ theme }) => theme.colors.gray[400]};

  select {
    padding-right: ${({ theme }) => theme.spacing[3]};
    color: currentColor;
    border: none;
    background: none;
    appearance: none;
    font-size: ${({ theme }) => theme.fontSizes.sm};
  }

  svg {
    position: absolute;
    top: 50%;
    margin-top: -2px;
    right: 0;
  }
`;

export const Type = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ theme }) => theme.colors.gray[900]};
  margin-right: ${({ theme }) => theme.spacing[2]};
`;

export const SpinnerContainer = styled.div`
  padding: ${({ theme }) => `${theme.spacing[1]} ${theme.spacing[4]}`};

  svg {
    margin: 0 auto;
    display: block;
  }
`;

export const Container = styled.div`
  height: calc(100% - 42px);
  overflow-y: auto;
`;
