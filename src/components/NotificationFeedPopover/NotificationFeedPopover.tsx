import React, { RefObject, useEffect } from "react";
import { usePopper } from "react-popper";
import { Placement } from "@popperjs/core";
import { NotificationFeed, NotificationFeedProps } from "../NotificationFeed";
import useComponentVisible from "../../hooks/useComponentVisible";

import "./styles.css";
import { useKnockFeed } from "../KnockFeedProvider";
import { Feed, FeedStoreState } from "@knocklabs/client";

type OnOpenOptions = {
  store: FeedStoreState;
  feedClient: Feed;
};

const defaultOnOpen = ({ store, feedClient }: OnOpenOptions) => {
  // Find all of the unseen items only
  const unseenItems = store.items.filter((item) => !item.seen_at);

  if (unseenItems.length > 0) {
    feedClient.markAsSeen(unseenItems);
  }
};

export interface NotificationFeedPopoverProps extends NotificationFeedProps {
  isVisible: boolean;
  onOpen?: (arg: OnOpenOptions) => void;
  onClose: (e: Event) => void;
  buttonRef: RefObject<HTMLElement>;
  closeOnClickOutside?: boolean;
  placement?: Placement;
}

export const NotificationFeedPopover: React.FC<NotificationFeedPopoverProps> = ({
  isVisible,
  onOpen = defaultOnOpen,
  onClose,
  buttonRef,
  closeOnClickOutside = true,
  placement = "bottom-end",
  ...feedProps
}) => {
  const { colorMode, feedClient, useFeedStore } = useKnockFeed();
  const store = useFeedStore();

  const { ref: popperRef } = useComponentVisible(isVisible, onClose, {
    closeOnClickOutside,
  });

  const { styles, attributes } = usePopper(
    buttonRef.current,
    popperRef.current,
    {
      strategy: "fixed",
      placement,
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

  useEffect(() => {
    // Whenever the feed is opened, we want to invoke the `onOpen` callback
    // function to handle any side effects.
    if (isVisible && onOpen) {
      onOpen({ store, feedClient });
    }
  }, [isVisible]);

  return (
    <div
      className={`rnf-notification-feed-popover rnf-notification-feed-popover--${colorMode}`}
      style={{
        ...styles.popper,
        visibility: isVisible ? "visible" : "hidden",
      }}
      ref={popperRef}
      {...attributes.popper}
      role="dialog"
      tabIndex={-1}
    >
      <div className="rnf-notification-feed-popover__inner">
        <NotificationFeed {...feedProps} />
      </div>
    </div>
  );
};
