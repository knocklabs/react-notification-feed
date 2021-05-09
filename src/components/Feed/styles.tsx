import styled from "@emotion/styled";
import { fontSizes, palette } from "../../theme";

export const Header = styled.header`
  padding: 12px 16px;
  height: 42px;
  display: flex;
  align-items: center;
`;

export const Selector = styled.div`
  display: flex;
  align-items: center;
`;

export const SelectWrapper = styled.div`
  font-size: 16px;
  font-weight: 500;
  position: relative;
  color: ${palette.grey["300"]};

  select {
    padding-right: 12px;
    color: currentColor;
    border: none;
    background: none;
    appearance: none;
    font-size: ${fontSizes.small};
  }

  svg {
    position: absolute;
    top: 50%;
    margin-top: -2px;
    right: 0;
  }
`;

export const Type = styled.span`
  font-size: ${fontSizes.small};
  font-weight: 600;
  color: ${palette.grey["900"]};
  margin-right: 8px;
`;

export const SpinnerContainer = styled.div`
  padding: 4px 16px;

  svg {
    margin: 0 auto;
    display: block;
  }
`;

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

export const Container = styled.div`
  height: calc(100% - 42px);
  overflow-y: auto;
`;
