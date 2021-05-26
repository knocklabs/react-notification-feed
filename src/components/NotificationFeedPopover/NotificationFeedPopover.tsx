import React, { RefObject } from "react";
import styled from "@emotion/styled";
import { usePopper } from "react-popper";
import { NotificationFeed, NotificationFeedProps } from "../NotificationFeed";

export interface NotificationFeedPopoverProps extends NotificationFeedProps {
  isVisible: boolean;
  onClose: () => void;
  buttonRef: RefObject<HTMLElement>;
}

export const NotificationFeedPopover: React.FC<NotificationFeedPopoverProps> = ({
  isVisible,
  onClose,
  buttonRef,
  ...feedProps
}) => {
  const popperRef = React.useRef<HTMLDivElement | null>(null);
  const [arrowRef, setArrowRef] = React.useState<HTMLSpanElement | null>(null);

  const { styles, attributes } = usePopper(
    buttonRef.current,
    popperRef.current,
    {
      strategy: "fixed",
      placement: "bottom-end",
      modifiers: [
        {
          name: "arrow",
          options: {
            element: arrowRef,
          },
        },
        {
          name: "offset",
          options: {
            offset: [0, 8],
          },
        },
      ],
    }
  );

  const handleClickOutside = React.useCallback(
    (e) => {
      if (popperRef.current && popperRef.current.contains(e.target)) {
        return;
      }

      onClose();
    },
    [onClose]
  );

  React.useEffect(() => {
    if (isVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isVisible]);

  return (
    <Popover
      style={{ ...styles.popper, visibility: isVisible ? "visible" : "hidden" }}
      ref={popperRef}
      {...attributes.popper}
      role="dialog"
      tabIndex={-1}
    >
      <Arrow ref={setArrowRef} style={styles.arrow} />
      <PopoverInner>
        <NotificationFeed isVisible={isVisible} {...feedProps} />
      </PopoverInner>
    </Popover>
  );
};

const Popover = styled.div`
  width: 100%;
  max-width: 400px;
  min-width: 280px;
  height: 400px;
  background-color: ${({ theme }) => theme.colors.common.white};
  box-shadow: 1px 2px 2px rgba(0, 0, 0, 0.1), -1px -1px 1px rgba(0, 0, 0, 0.1);
  z-index: 999;
`;

const PopoverInner = styled.div`
  height: 100%;
`;

const Arrow = styled.div`
  position: absolute;
  width: 10px;
  height: 10px;

  &:after {
    content: " ";
    display: block;
    background-color: ${({ theme }) => theme.colors.common.white};
    box-shadow: -1px -1px 1px rgba(0, 0, 0, 0.1);
    position: absolute;
    top: -5px;
    left: 0;
    transform: rotate(45deg);
    width: 10px;
    height: 10px;
  }
`;
