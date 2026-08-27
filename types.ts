import { createContext, useContext, useMemo, type ReactNode } from "react";

export type Locale = string;

export type TranslationValue = string | number;

export type TranslationParams = Record<string, string | number>;

/**
 * Supports both nested JSON dictionaries and flat key-value maps
 */
export type NestedTranslations = {
  [key: string]: TranslationValue | NestedTranslations;
};

export type Translations = Record<Locale, NestedTranslations>;

/**
 * Utility type to recursively flatten nested keys into dot-notation paths for TypeScript autocompletion
 */
export type NestedKeyOf<ObjectType extends object> = {
  [Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends object
    ? `${Key}` | `${Key}.${NestedKeyOf<ObjectType[Key]>}`
    : `${Key}`;
}[keyof ObjectType & (string | number)];

export type I18nContextValue<TKeys extends string = string> = {
  locale: Locale;
  locales: Locale[];
  t: (key: TKeys | (string & {}), params?: TranslationParams) => string;
};

const I18nContext = createContext<I18nContextValue>({
  locale: "en",
  locales: ["en"],
  t: (key: string) => key,
});

/**
 * Safely resolves a dot-notated key from flat or nested translation dictionaries.
 */
function resolveNestedKey(
  dict: NestedTranslations | undefined,
  path: string
): string | undefined {
  if (!dict) return undefined;

  // 1. Direct flat key lookup (e.g. dict["app.title"])
  if (typeof dict[path] === "string" || typeof dict[path] === "number") {
    return String(dict[path]);
  }

  // 2. Nested path traversal (e.g. dict["app"]["title"])
  const segments = path.split(".");
  let current: any = dict;

  for (const segment of segments) {
    if (current === null || current === undefined || typeof current !== "object") {
      return undefined;
    }
    current = current[segment];
  }

  if (typeof current === "string" || typeof current === "number") {
    return String(current);
  }

  return undefined;
}

/**
 * Resolves translation with Pluralization support (_zero, _one, _other)
 */
function resolveTranslation(
  dict: NestedTranslations | undefined,
  key: string,
  params?: TranslationParams
): string | undefined {
  if (!dict) return undefined;

  if (params && typeof params.count === "number") {
    const count = params.count;
    let pluralSuffix = "_other";
    if (count === 0) pluralSuffix = "_zero";
    else if (count === 1) pluralSuffix = "_one";
    else if (count > 1) pluralSuffix = "_other";

    // Try plural-specific key first (e.g. "items_one", "items.count_zero")
    const pluralKey = `${key}${pluralSuffix}`;
    const pluralResult = resolveNestedKey(dict, pluralKey);
    if (pluralResult !== undefined) {
      return pluralResult;
    }
  }

  // Fallback to exact key
  return resolveNestedKey(dict, key);
}

/**
 * Interpolates variables inside template string.
 * Supports both {{variable}} and {variable} syntax.
 */
function interpolate(template: string, params?: TranslationParams): string {
  if (!params) {
    return template;
  }
  return template.replace(/\{?\{\s*([a-zA-Z0-9_]+)\s*\}\}?/g, (match, rawKey: string) => {
    const key = rawKey.trim();
    return params[key] !== undefined ? String(params[key]) : match;
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
    const availableLocales = Object.keys(translations);

    return {
      locale: normalizedLocale,
      locales: availableLocales,
      t: (key: string, params?: TranslationParams) => {
        // 1. Try normalized current locale
        const currentMsg = resolveTranslation(
          translations[normalizedLocale],
          key,
          params
        );
        if (currentMsg !== undefined) {
          return interpolate(currentMsg, params);
        }

        // 2. Fallback to default locale
        const defaultMsg = resolveTranslation(
          translations[defaultLocale],
          key,
          params
        );
        if (defaultMsg !== undefined) {
          return interpolate(defaultMsg, params);
        }

        // 3. Fallback to raw key
        return interpolate(key, params);
      },
    };
  }, [locale, translations, defaultLocale]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n<TKeys extends string = string>() {
  return useContext(I18nContext) as I18nContextValue<TKeys>;
}