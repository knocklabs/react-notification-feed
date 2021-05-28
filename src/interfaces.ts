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
