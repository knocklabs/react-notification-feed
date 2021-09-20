export enum FilterStatus {
  All = "all",
  Unread = "unread",
  Unseen = "unseen",
}

export const FilterStatusToLabel = {
  [FilterStatus.All]: "All",
  [FilterStatus.Unread]: "Unread",
  [FilterStatus.Unseen]: "Unseen",
};

export type ColorMode = "light" | "dark";
