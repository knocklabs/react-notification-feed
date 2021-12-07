import React from "react";
import { useKnockFeed } from "../KnockFeedProvider";
import { Spinner } from "../Spinner";
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

  const showWhileLoading = loadingText || (
    <span className="rnf-button__button-text-hidden">{children}</span>
  );

  return (
    <button
      onClick={onClick}
      className={classNames}
      disabled={isLoading || isDisabled}
    >
      {isLoading && <ButtonSpinner label={loadingText} />}
      {isLoading ? showWhileLoading : children}
    </button>
  );
};
