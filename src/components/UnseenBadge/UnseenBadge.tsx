import React from "react";
import { useKnockFeed } from "../KnockFeedProvider";
import { formatBadgeCount } from "../../utils";

import "./styles.css";

export const UnseenBadge = () => {
  const { useFeedStore } = useKnockFeed();
  const unseenCount = useFeedStore((state) => state.metadata.unseen_count);

  return unseenCount !== 0 ? (
    <div className="rnf-unseen-badge">
      <span className="rnf-unseen-badge__count">
        {formatBadgeCount(unseenCount)}
      </span>
    </div>
  ) : null;
};
