import React, { RefObject } from "react";
import { usePopper } from "react-popper";
import { NotificationFeed, NotificationFeedProps } from "../NotificationFeed";
import useComponentVisible from "../../hooks/useComponentVisible";

import "./styles.css";
import { useKnockFeed } from "../KnockFeedProvider";

export interface NotificationFeedPopoverProps extends NotificationFeedProps {
  isVisible: boolean;
  onClose: (e: Event) => void;
  buttonRef: RefObject<HTMLElement>;
  closeOnClickOutside?: boolean;
}

export const NotificationFeedPopover: React.FC<NotificationFeedPopoverProps> = ({
  isVisible,
  onClose,
  buttonRef,
  closeOnClickOutside = true,
  ...feedProps
}) => {
  const { colorMode } = useKnockFeed();
  const { ref: popperRef } = useComponentVisible(isVisible, onClose, {
    closeOnClickOutside,
  });

  const { styles, attributes } = usePopper(
    buttonRef.current,
    popperRef.current,
    {
      strategy: "fixed",
      placement: "bottom-end",
      modifiers: [
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
      className={`rnf-notification-feed-popover rnf-notification-feed-popover--${colorMode}`}
      style={{ ...styles.popper, visibility: isVisible ? "visible" : "hidden" }}
      ref={popperRef}
      {...attributes.popper}
      role="dialog"
      tabIndex={-1}
    >
      <div className="rnf-notification-feed-popover__inner">
        <NotificationFeed isVisible={isVisible} {...feedProps} />
      </div>
    </div>
  );
};
