import React, { ReactElement } from "react";
import styled from "@emotion/styled";
import { usePopper } from "react-popper";
import { useFeedProviderState } from "../FeedProvider";
import BellIcon from "../Icons/Bell";

import { formatBadgeCount } from "../../utils";
import { palette, spacing } from "../../theme";
import { StoreState } from "@knocklabs/client";

type Props = {
  children: ({ onClose }: { onClose: () => void }) => ReactElement;
};

const NotificationBadge: React.FC<Props> = ({ children }) => {
  const buttonRef = React.useRef(null);
  const popperRef = React.useRef(null);
  const [arrowRef, setArrowRef] = React.useState(null);
  const [isVisible, setIsVisible] = React.useState(false);

  const { useFeedStore } = useFeedProviderState();
  const unseenCount = useFeedStore(
    (state: StoreState) => state.metadata.unseen_count
  );

  const { styles, attributes } = usePopper(
    buttonRef.current,
    popperRef.current,
    {
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
        popperRef.current.contains(e.target) ||
        buttonRef.current.contains(e.target)
      ) {
        return;
      }

      setIsVisible(false);
    },
    [setIsVisible]
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
    <>
      <NotificationButton
        onClick={() => setIsVisible(!isVisible)}
        ref={buttonRef}
      >
        <BellIcon />
        {unseenCount !== 0 && (
          <UnreadBadge>
            <UnreadCount>{formatBadgeCount(unseenCount)}</UnreadCount>
          </UnreadBadge>
        )}
      </NotificationButton>
      {isVisible ? (
        <Popover style={styles.popper} ref={popperRef} {...attributes.popper}>
          <Arrow ref={setArrowRef} style={styles.arrow} />
          <PopoverInner>
            {children({ onClose: () => setIsVisible(false) })}
          </PopoverInner>
        </Popover>
      ) : null}
    </>
  );
};

const NotificationButton = styled.button`
  background-color: transparent;
  border: none;
  position: relative;
  padding: ${spacing.xsmall};
  box-sizing: border-box;
  cursor: pointer;
`;

const UnreadBadge = styled.div`
  background-color: ${palette.red["200"]};
  width: 16px;
  height: 16px;
  border-radius: 16px;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 6px;
  right: 6px;
`;

const UnreadCount = styled.span`
  font-size: 9px;
  font-weight: 500;
  color: ${palette.common.white};
  margin-top: -1px;
`;

const Popover = styled.div`
  width: 400px;
  height: 400px;
  background-color: ${palette.common.white};
  box-shadow: 1px 2px 2px rgba(0, 0, 0, 0.1), -1px -1px 1px rgba(0, 0, 0, 0.1);
`;

const PopoverInner = styled.div`
  overflow-y: scroll;
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

export default NotificationBadge;
