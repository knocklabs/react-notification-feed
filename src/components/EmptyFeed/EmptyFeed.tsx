import React from "react";
import { useKnockFeed } from "../KnockFeedProvider";
import "./styles.css";

export type EmptyFeedProps = {
  showPoweredBy?: boolean;
};

export const EmptyFeed: React.FC<EmptyFeedProps> = ({
  showPoweredBy = true,
}) => {
  const { colorMode } = useKnockFeed();

  return (
    <div className={`rnf-empty-feed rnf-empty-feed--${colorMode}`}>
      <div className="rnf-empty-feed__inner">
        <h2 className="rnf-empty-feed__header">No notifications yet</h2>
        <p className="rnf-empty-feed__body">
          We'll let you know when we've got something new for you.
        </p>
      </div>

      {showPoweredBy && (
        <a
          href="https://knock.app?utm_source=in-app-feed&utm_medium=in-app-feed&utm_campaign=in-app-feed"
          target="_blank"
          className="rnf-empty-feed__powered-by-knock"
        >
          Powered by Knock
        </a>
      )}
    </div>
  );
};
