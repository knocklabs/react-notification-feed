import en from "./languages/en";

export interface Translations {
  readonly emptyFeedTitle: string;
  readonly emptyFeedBody: string;
  readonly notifications: string;
  readonly poweredBy: string;
  readonly markAllAsRead: string;
  readonly archiveNotification: string;
}

export interface Translation {
  readonly translations: Partial<Translations>;
  readonly lang: string;
}

export const i18n = { en };
