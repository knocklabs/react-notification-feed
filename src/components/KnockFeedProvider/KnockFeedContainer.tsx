import React from "react";
import "./styles.css";

export const KnockFeedContainer: React.FC = ({ children }) => {
  return (
    <div className="rnf-feed-provider">{children}</div>
  );
};
