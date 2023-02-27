import React from "react";
import { locales, I18nContent } from "../../i18n";

export const I18nContext = React.createContext<I18nContent>(locales.en);

interface KnockI18nProviderProps {
  i18n?: I18nContent;
  children: JSX.Element | undefined;
}

export function KnockI18nProvider({
  i18n = locales.en,
  ...props
}: KnockI18nProviderProps) {
  return <I18nContext.Provider {...props} value={i18n} />;
}
