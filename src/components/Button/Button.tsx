import React from "react";
import { useKnockFeed } from "../KnockFeedProvider";
import { ButtonSpinner } from "./ButtonSpinner";

import "./styles.css";

export type ButtonProps = {
  variant: "primary" | "secondary";
  loadingText?: string;
  isLoading?: boolean;
  isDisabled?: boolean;
  isFullWidth?: boolean;
  onClick: (e: React.MouseEvent) => void;
};

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  loadingText,
  isLoading = false,
  isDisabled = false,
  isFullWidth = false,
  onClick,
  children,
}) => {
  const { colorMode } = useKnockFeed();

  const classNames = [
    "rnf-button",
    `rnf-button--${variant}`,
    isFullWidth ? "rnf-button--full-width" : "",
    isLoading ? "rnf-button--is-loading" : "",
    `rnf-button--${colorMode}`,
  ].join(" ");

  // In this case when there's no loading text, we still want to display the original
  // content of the button, but make it hidden. That allows us to keep the button width
  // consistent and show the spinner in the middle, meaning no layout shift.
  const textToShowWhileLoading = loadingText || (
    <span className="rnf-button__button-text-hidden">{children}</span>
  );

  return (
    <button
      onClick={onClick}
      className={classNames}
      disabled={isLoading || isDisabled}
    >
      {isLoading && <ButtonSpinner hasLabel={!!loadingText} />}
      {isLoading ? textToShowWhileLoading : children}
    </button>
  );
};
