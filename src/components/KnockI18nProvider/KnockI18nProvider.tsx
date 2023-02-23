import React from "react";
import { i18n as translations, Translation } from "../../i18n";

export const I18nContext = React.createContext<Translation>(translations.en);

interface KnockI18nProviderProps {
  i18n?: Translation;
  children: JSX.Element | undefined;
}

export function KnockI18nProvider({ i18n, ...props }: KnockI18nProviderProps) {
  const translationEntry = React.useMemo<Translation>(() => {
    if (typeof i18n === "undefined") {
      return translations.en;
    }

    return i18n;
  }, [i18n]);

  return <I18nContext.Provider {...props} value={translationEntry} />;
}
