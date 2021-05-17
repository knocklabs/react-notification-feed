type Unit = number | string;

type ColorPalette = {
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
};

export interface Theme {
  spacing: {
    0: Unit;
    1: Unit;
    2: Unit;
    3: Unit;
    4: Unit;
    5: Unit;
    6: Unit;
    7: Unit;
    8: Unit;
  };
  fontSizes: {
    xs: Unit;
    sm: Unit;
    md: Unit;
    lg: Unit;
    xl: Unit;
    "2xl": Unit;
    "3xl": Unit;
  };
  colors: {
    common: {
      white: string;
      black: string;
    };
    brand: ColorPalette;
    gray: ColorPalette;
    red: ColorPalette;
  };
  typography: {
    sanserif: string;
  };
  fontWeights: {
    normal: number;
    medium: number;
    semibold: number;
    bold: number;
  };
  shadows: {
    0: string;
    1: string;
    2: string;
  };
  borderRadius: {
    0: Unit;
    1: string;
    2: string;
  };
}

const spacing = {
  0: 0,
  1: "4px",
  2: "8px",
  3: "12px",
  4: "16px",
  5: "20px",
  6: "24px",
  7: "32px",
  8: "48px",
};

const fontSizes = {
  xs: "0.75rem",
  sm: "0.875rem",
  md: "1rem",
  lg: "1.125rem",
  xl: "1.266rem",
  "2xl": "1.5rem",
  "3xl": "1.75rem",
};

const fontWeights = {
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
};

const white = "#fff";
const black = "#111";

const colors = {
  common: {
    black,
    white,
  },
  brand: {
    900: "#891E10",
    800: "#153e75",
    700: "#E4321B",
    600: "#E95744",
    500: "#E95744",
    400: "#E95744",
    300: "#EF8476",
    200: "#EF8476",
    100: "#F4ADA4",
  },
  gray: {
    100: "#E4E8EE",
    200: "#DDDEE1",
    300: "#A5ACB8",
    400: "#9EA0AA",
    500: "#697386",
    600: "#515669",
    700: "#3C4257",
    800: "#3C4257",
    900: "#1A1F36",
  },
  red: {
    100: "#FAE3E2",
    200: "#F6CCCB",
    300: "#F0A9A7",
    400: "#E87975",
    500: "#DD514C",
    600: "#CB3A31",
    700: "#AA2D27",
    800: "#8D2723",
    900: "#752522",
  },
};

const shadows = {
  0: "none",
  1: "0px 5px 10px rgba(0, 0, 0, 0.12)",
  2: "0px 8px 30px rgba(0, 0, 0, 0.24)",
};

const typography = {
  sanserif:
    "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Ubuntu, 'Helvetica Neue', sans-serif",
};

const borderRadius = {
  0: 0,
  1: "2px",
  2: "4px",
};

export {
  colors,
  shadows,
  typography,
  spacing,
  fontSizes,
  borderRadius,
  fontWeights,
};
