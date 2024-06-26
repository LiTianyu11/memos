import { FallbackLngObjList } from "i18next";
import { useTranslation } from "react-i18next";
import i18n, { locales, TLocale } from "@/i18n";
import enTranslation from "@/locales/en.json";
import type { NestedKeyOf } from "@/types/utils/nestedKeyOf.types";

// 用于locales匹配最适合的语言
export const findNearestMatchedLanguage = (language: string): Locale => {
  //console.log(language) //zh-CN
  //console.log(locales) //array[24]
  if (locales.includes(language as TLocale)) {
    return language as Locale;
  }

  const i18nFallbacks = Object.entries(i18n.store.options.fallbackLng as FallbackLngObjList);
  //console.log(i18nFallbacks) 
  for (const [main, fallbacks] of i18nFallbacks) {
    if (language === main) {
      return fallbacks[0] as Locale;
    }
  }

  
  const shortCode = language.substring(0, 2);
  //console.log(shortCode) 
  if (locales.includes(shortCode as TLocale)) {
    return shortCode as Locale;
  }

  // Try to match "xx-YY" to existing translation for "xx-ZZ" as a last resort
  // If some match is undesired, it can be overridden in src/i18n.ts `fallbacks` option
  for (const existing of locales) {
    console.log(existing) 
    if (shortCode == existing.substring(0, 2)) {
      return existing as Locale;
    }
  }

  // should be "en", so the selector is not empty if there isn't a translation for current user's language
  return (i18n.store.options.fallbackLng as FallbackLngObjList).default[0] as Locale;
};

// Represents the keys of nested translation objects.
export type Translations = NestedKeyOf<typeof enTranslation>;

// Represents a typed translation function.
type TypedT = (key: Translations, params?: Record<string, any>) => string;

export const useTranslate = (): TypedT => {
  const { t } = useTranslation<Translations>();
  return t;
};
