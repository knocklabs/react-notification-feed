import React, { ReactNode, RefObject } from "react";
import styled from "@emotion/styled";
import { usePopper } from "react-popper";
import { palette } from "../../theme";
import Feed from "../Feed/Feed";

type Props = {
  isVisible: boolean;
  onClose: () => void;
  buttonRef: RefObject<HTMLElement>;
};

const FeedPopover: React.FC<Props> = ({ isVisible, onClose, buttonRef }) => {
  const popperRef = React.useRef<HTMLDivElement | null>(null);
  const [arrowRef, setArrowRef] = React.useState<HTMLSpanElement | null>(null);

  const { styles, attributes } = usePopper(
    buttonRef.current,
    popperRef.current,
    {
      strategy: "fixed",
      modifiers: [
        {
          name: "arrow",
          options: {
            element: arrowRef,
          },
        },
      ],
    }
  );

  const handleClickOutside = React.useCallback(
    (e) => {
      if (
        (popperRef.current && popperRef.current.contains(e.target)) ||
        (buttonRef.current && buttonRef.current.contains(e.target))
      ) {
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

  return isVisible ? (
    <Popover style={styles.popper} ref={popperRef} {...attributes.popper}>
      <Arrow ref={setArrowRef} style={styles.arrow} />
      <PopoverInner>
        <Feed />
      </PopoverInner>
    </Popover>
  ) : null;
};

const Popover = styled.div`
  width: 400px;
  height: 400px;
  background-color: ${palette.common.white};
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
    background-color: ${palette.common.white};
    box-shadow: -1px -1px 1px rgba(0, 0, 0, 0.1);
    position: absolute;
    top: -5px;
    left: 0;
    transform: rotate(45deg);
    width: 10px;
    height: 10px;
  }
`;

export default FeedPopover;
