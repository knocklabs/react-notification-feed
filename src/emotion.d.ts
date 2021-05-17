import "@emotion/react";
import { Theme as KnockTheme } from "./theme";

declare module "@emotion/react" {
  export interface Theme extends KnockTheme {}
}
