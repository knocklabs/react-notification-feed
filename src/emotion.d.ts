import "@emotion/react";
import { Theme as FeedTheme } from "./theme";

declare module "@emotion/react" {
  export interface Theme extends FeedTheme {}
}
