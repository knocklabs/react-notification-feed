import React from "react";
import { Spinner } from "../Spinner";

import "./styles.css";

type ButtonSpinnerProps = {
  label?: string;
};

export const ButtonSpinner: React.FC<ButtonSpinnerProps> = ({ label }) => (
  <div
    className={`rnf-button-spinner rnf-button-spinner--${
      label ? "with-label" : "without-label"
    }`}
  >
    <Spinner />
  </div>
);
