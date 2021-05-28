import "@emotion/react";
import { Theme as FeedTheme } from "./interfaces";

declare module "@emotion/react" {
  export interface Theme extends FeedTheme {}
}
