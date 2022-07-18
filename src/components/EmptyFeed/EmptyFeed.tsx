import React from "react";
import { useKnockFeed } from "../KnockFeedProvider";
import "./styles.css";

export const EmptyFeed: React.FC = () => {
  const { colorMode } = useKnockFeed();

  return (
    <div className={`rnf-empty-feed rnf-empty-feed--${colorMode}`}>
      <div className="rnf-empty-feed__inner">
        <h2 className="rnf-empty-feed__header">No notifications yet</h2>
        <p className="rnf-empty-feed__body">
          We'll let you know when we've got something new for you.
        </p>
      </div>
    </div>
  );
};
