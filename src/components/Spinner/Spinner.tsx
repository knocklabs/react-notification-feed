import React from "react";

type Speed = "fast" | "slow" | "medium";

function speedSwitch(speed: Speed) {
  if (speed === "fast") return 600;
  if (speed === "slow") return 900;
  return 750;
}

export interface SpinnerProps {
  color?: string;
  speed?: Speed;
  gap?: number;
  thickness?: number;
  size?: string;
}

export const Spinner: React.FC<SpinnerProps> = ({
  color = "rgba(0,0,0,0.4)",
  speed = "medium",
  gap = 4,
  thickness = 4,
  size = "1em",
  ...props
}) => (
  <svg
    height={size}
    width={size}
    {...props}
    style={{ animationDuration: `${speedSwitch(speed)}ms` }}
    className="__react-svg-spinner_circle"
    role="img"
    aria-labelledby="title desc"
    viewBox="0 0 32 32"
  >
    <title id="title">Circle loading spinner</title>
    <desc id="desc">Image of a partial circle indicating "loading."</desc>
    <style
      dangerouslySetInnerHTML={{
        __html: `
      .__react-svg-spinner_circle{
          transition-property: transform;
          animation-name: __react-svg-spinner_infinite-spin;
          animation-iteration-count: infinite;
          animation-timing-function: linear;
      }
      @keyframes __react-svg-spinner_infinite-spin {
          from {transform: rotate(0deg)}
          to {transform: rotate(360deg)}
      }
    `,
      }}
    />
    <circle
      role="presentation"
      cx={16}
      cy={16}
      r={14 - thickness / 2}
      stroke={color}
      fill="none"
      strokeWidth={thickness}
      strokeDasharray={Math.PI * 2 * (11 - gap)}
      strokeLinecap="round"
    />
  </svg>
);
