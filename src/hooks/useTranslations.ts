import { useContext } from "react";
import { Locale as DateFnLocale } from "date-fns";
import * as dateFnsLocales from "date-fns/locale";
import { I18nContent, locales } from "../i18n";
import { I18nContext } from "../components/KnockI18nProvider";

export function useTranslations() {
  const { translations, locale } = useContext<I18nContent>(I18nContext);

  return {
    locale,
    t: (key: keyof typeof translations) => {
      // We always use english as the default translation when a key doesn't exist
      return translations[key] || locales.en.translations[key];
    },
    dateFnsLocale: (): DateFnLocale => {
      return locale in dateFnsLocales
        ? dateFnsLocales[locale]
        : dateFnsLocales.enUS;
    },
  };
}
