# 🌐 react-simple-i18n

<p align="center">
  <a href="https://www.npmjs.com/package/react-simple-i18n"><img src="https://img.shields.io/badge/npm-v1.2.0-blue?style=flat-square" alt="npm" /></a>
  <img src="https://img.shields.io/badge/bundle%20size-%3C%201KB-brightgreen?style=flat-square" alt="Bundle Size" />
  <img src="https://img.shields.io/badge/TypeScript-Ready-blue?style=flat-square&logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/dependencies-0-success?style=flat-square" alt="Zero Dependencies" />
  <img src="https://img.shields.io/badge/license-MIT-green?style=flat-square" alt="License" />
</p>

> A **zero-dependency, ultra-lightweight (< 1KB)** internationalization (i18n) library for React applications.  
> Designed with simplicity, speed, and modern React (18/19) in mind.

---

## ✨ Features

- 🪶 **Zero Dependencies & Ultra Lightweight**: Less than **1 KB** minified + gzipped. No bloated dependencies.
- 🌳 **Nested & Flat Dictionaries**: Seamlessly supports both nested JSON objects (`user.profile.title`) and flat key maps (`"user.title": "..."`).
- 🔢 **Smart Pluralization**: Built-in support for count-based plural resolution (`_zero`, `_one`, `_other`).
- ⚡ **Dynamic Interpolation**: Insert dynamic variables via `{{variable}}` or `{variable}` effortlessly.
- 🛡️ **Graceful Fallback**: Automatically falls back from current language to `defaultLocale`, and finally to raw key. No crash, no white screens.
- 🔒 **Type-Safe Autocompletion**: Full TypeScript support with path inference helper types.
- ⚛️ **Hook & Context API**: Modern React architecture using `I18nProvider` and `useI18n()`.

---

## 📦 Installation

```bash
npm install react-simple-i18n
# or
pnpm add react-simple-i18n
# or
yarn add react-simple-i18n
```

---

## 🚀 Quick Start

### 1. Define Translations

```typescript
import { type Translations } from "react-simple-i18n";

export const translations: Translations = {
  en: {
    app: {
      title: "Welcome, {{name}}!",
      subtitle: "Explore our awesome platform.",
    },
    cart: {
      items_zero: "Your cart is empty.",
      items_one: "You have 1 item in your cart.",
      items_other: "You have {{count}} items in your cart.",
    },
    "button.checkout": "Proceed to Checkout",
  },
  "zh-CN": {
    app: {
      title: "欢迎你，{{name}}！",
      subtitle: "探索精彩的系统平台。",
    },
    cart: {
      items_zero: "您的购物车是空的。",
      items_one: "您的购物车中有 1 件商品。",
      items_other: "您的购物车中有 {{count}} 件商品。",
    },
    "button.checkout": "前往结算",
  },
};
```

### 2. Wrap with `I18nProvider`

```tsx
import React, { useState } from "react";
import { I18nProvider, type Locale } from "react-simple-i18n";
import { translations } from "./translations";
import AppContent from "./AppContent";

export function App() {
  const [locale, setLocale] = useState<Locale>("en");

  return (
    <I18nProvider locale={locale} translations={translations} defaultLocale="en">
      <AppContent onLocaleChange={setLocale} currentLocale={locale} />
    </I18nProvider>
  );
}
```

### 3. Use `useI18n` in Any Component

```tsx
import React from "react";
import { useI18n } from "react-simple-i18n";

export function AppContent() {
  const { t, locale, locales } = useI18n();

  return (
    <div>
      {/* 1. Basic nested key translation with parameters */}
      <h1>{t("app.title", { name: "Alice" })}</h1>
      <p>{t("app.subtitle")}</p>

      {/* 2. Pluralization support */}
      <p>{t("cart.items", { count: 3 })}</p>

      {/* 3. Flat key lookup */}
      <button>{t("button.checkout")}</button>
    </div>
  );
}
```

---

## 📖 API Reference

### `I18nProvider`

| Prop | Type | Default | Description |
|---|---|---|---|
| `locale` | `string` | **Required** | Current active language code (e.g. `'en'`, `'zh-CN'`). |
| `translations` | `Translations` | **Required** | Dictionary map of all language definitions. |
| `defaultLocale` | `string` | `'en'` | Fallback language when a key is missing in active locale. |
| `children` | `ReactNode` | **Required** | Child React components. |

### `useI18n()`

Returns an object containing:
- `locale: string` — The current active locale.
- `locales: string[]` — List of all available locale keys defined in translations.
- `t(key: string, params?: Record<string, string | number>): string` — Translation lookup and interpolation function.

---

## 📄 License

MIT © [LBH](https://github.com/glei4134-collab)