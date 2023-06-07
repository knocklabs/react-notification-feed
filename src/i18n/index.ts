import en from "./languages/en";
import de from "./languages/de";

export interface Translations {
  readonly emptyFeedTitle: string;
  readonly emptyFeedBody: string;
  readonly notifications: string;
  readonly poweredBy: string;
  readonly markAllAsRead: string;
  readonly archiveNotification: string;
  readonly all: string;
  readonly unread: string;
  readonly read: string;
  readonly unseen: string;
}

export interface I18nContent {
  readonly translations: Partial<Translations>;
  readonly locale: string;
}

export const locales = { en, de };
