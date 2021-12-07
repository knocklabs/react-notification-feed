import React from "react";
import { Spinner } from "../Spinner";

import "./styles.css";

type ButtonSpinnerProps = {
  hasLabel: boolean;
};

export const ButtonSpinner: React.FC<ButtonSpinnerProps> = ({ hasLabel }) => (
  <div
    className={`rnf-button-spinner rnf-button-spinner--${
      hasLabel ? "with-label" : "without-label"
    }`}
  >
    <Spinner />
  </div>
);
