import { useContext } from "react";
import { Locale } from "date-fns";
import * as dateFnsLocales from "date-fns/locale";
import { Translation, i18n } from "../i18n";
import { I18nContext } from "../components/KnockI18nProvider";

export function useTranslations() {
  const { translations, lang } = useContext<Translation>(I18nContext);

  return {
    lang,
    t: (key: keyof typeof translations) => {
      // We always use english as the default translation when a key doesn't exist
      return translations[key] || i18n.en.translations[key];
    },
    dateFnsLocale: (): Locale => {
      return lang in dateFnsLocales
        ? dateFnsLocales[lang]
        : dateFnsLocales.enUS;
    },
  };
}
