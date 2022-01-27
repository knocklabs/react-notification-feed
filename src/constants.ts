export enum FilterStatus {
  All = "all",
  Read = "read",
  Unread = "unread",
}

export const FilterStatusToLabel = {
  [FilterStatus.All]: "All",
  [FilterStatus.Unread]: "Unread",
  [FilterStatus.Read]: "Read",
};

export type ColorMode = "light" | "dark";
