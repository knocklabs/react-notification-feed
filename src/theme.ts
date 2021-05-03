const spacing = {
  none: 0,
  xxsmall: "4px",
  xsmall: "8px",
  small: "12px",
  medium: "16px",
  gutter: "20px",
  large: "24px",
  xlarge: "32px",
  xxlarge: "48px",
};

const fontSizes = {
  xsmall: "0.79rem",
  small: "0.875rem",
  medium: "1rem",
  large: "1.125rem",
  xlarge: "1.266rem",
  xxlarge: "1.424rem",
};

const white = "#fff";
const black = "#111";

const palette = {
  common: {
    black,
    white,
  },
  primary: {
    main: "#0070F3",
    light: "#146DD6",
    contrastText: white,
  },
  error: {
    main: "#A51C30",
    light: "#A7333F",
    contrastText: white,
  },
  grey: {
    100: "#EAEAEA",
    200: "#A5ACB8",
    300: "#9EA0AA",
    500: "#697386",
    900: "#1A1F36",
  },
  blue: {
    200: "#90CDF4",
    400: "#4299E1",
  },
  red: {
    200: "#EB5757",
  },
};

const shadows = {
  0: "none",
  1: "0px 5px 10px rgba(0, 0, 0, 0.12)",
  2: "0px 8px 30px rgba(0, 0, 0, 0.24)",
};

const typography = {
  fontFamily:
    "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Ubuntu, 'Helvetica Neue', sans-serif",
};

const shape = {
  borderRadius: spacing["xxsmall"],
};

export { palette, shadows, typography, shape, spacing, fontSizes };
