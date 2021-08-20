import React, { RefObject } from "react";
import { usePopper } from "react-popper";
import { NotificationFeed, NotificationFeedProps } from "../NotificationFeed";
import useComponentVisible from "../../hooks/useComponentVisible";

import "./styles.css";

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
  const { ref: popperRef } = useComponentVisible(isVisible, onClose);
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

  return (
    <div
      className="rnf-notification-feed-popover"
      style={{ ...styles.popper, visibility: isVisible ? "visible" : "hidden" }}
      ref={popperRef}
      {...attributes.popper}
      role="dialog"
      tabIndex={-1}
    >
      <div
        className="rnf-notification-feed-popover__arrow"
        ref={setArrowRef}
        style={styles.arrow}
      />
      <div className="rnf-notification-feed-popover__inner">
        <NotificationFeed isVisible={isVisible} {...feedProps} />
      </div>
    </div>
  );
};
