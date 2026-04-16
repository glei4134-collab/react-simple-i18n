import { createContext, useContext, useMemo, type ReactNode } from "react";

export type Locale = string;

export type TranslationValue = string;

export type TranslationParams = Record<string, string | number>;

export type Translations = Record<Locale, Record<string, TranslationValue>>;

export type I18nContextValue = {
  locale: Locale;
  t: (key: string, params?: TranslationParams) => string;
};

const I18nContext = createContext<I18nContextValue>({
  locale: "en",
  t: (key: string) => key,
});

function interpolate(template: string, params?: TranslationParams) {
  if (!params) {
    return template;
  }
  return template.replace(/\{\{(.*?)\}\}/g, (_, rawKey: string) => {
    const key = rawKey.trim();
    return String(params[key] ?? "");
  });
}

export type I18nProviderProps = {
  locale: Locale;
  translations: Translations;
  defaultLocale?: Locale;
  children: ReactNode;
};

export function I18nProvider({
  locale,
  translations,
  defaultLocale = "en",
  children,
}: I18nProviderProps) {
  const value = useMemo<I18nContextValue>(() => {
    const normalizedLocale = translations[locale] ? locale : defaultLocale;
    return {
      locale: normalizedLocale,
      t: (key: string, params?: TranslationParams) => {
        const message =
          translations[normalizedLocale]?.[key] ??
          translations[defaultLocale]?.[key] ??
          key;
        return interpolate(message, params);
      },
    };
  }, [locale, translations, defaultLocale]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  return useContext(I18nContext);
}
