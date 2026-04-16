# react-simple-i18n

A lightweight, zero-dependency internationalization (i18n) library for React applications.

## Features

- **Zero dependencies** - No external libraries required
- **TypeScript support** - Fully typed for type safety
- **Simple API** - Easy to learn and use
- **Parameter interpolation** - Support for dynamic values in translations
- **Flexible** - Works with any translation structure

## Installation

```bash
npm install react-simple-i18n
```

Or using yarn:

```bash
yarn add react-simple-i18n
```

## Quick Start

### 1. Define Your Translations

```typescript
// translations.ts
import type { Translations } from 'react-simple-i18n';

export const translations: Translations = {
  en: {
    'greeting': 'Hello, {{name}}!',
    'settings.title': 'Settings',
    'settings.language': 'Language',
  },
  'zh-CN': {
    'greeting': '你好，{{name}}！',
    'settings.title': '设置',
    'settings.language': '语言',
  },
};

export const DEFAULT_LOCALE = 'en';
```

### 2. Wrap Your App

```tsx
import { I18nProvider } from 'react-simple-i18n';
import { translations, DEFAULT_LOCALE } from './translations';

function App() {
  const [locale, setLocale] = useState(DEFAULT_LOCALE);

  return (
    <I18nProvider locale={locale} translations={translations}>
      <YourApp />
    </I18nProvider>
  );
}
```

### 3. Use Translations in Components

```tsx
import { useI18n } from 'react-simple-i18n';

function Welcome() {
  const { t, locale } = useI18n();

  return (
    <div>
      <h1>{t('greeting', { name: 'World' })}</h1>
      <p>Current language: {locale}</p>
    </div>
  );
}
```

## API Reference

### `<I18nProvider>`

The main provider component that provides i18n context to your app.

**Props:**

- `locale` (string, required) - The current locale identifier
- `translations` (Translations, required) - Your translation object
- `defaultLocale` (string, optional) - Fallback locale if translation is missing (default: 'en')
- `children` (ReactNode, required) - Child components

### `useI18n()`

A hook that returns the i18n context value.

**Returns:**

- `locale` (string) - Current locale
- `t` (function) - Translation function

### `t(key, params?)`

The translation function.

**Parameters:**

- `key` (string, required) - Translation key (e.g., 'settings.title')
- `params` (object, optional) - Parameters for interpolation

**Returns:** Translated string with parameters replaced

## Translation Key Naming Convention

We recommend using dot notation for translation keys:

```
{page}.{component}.{description}
```

Examples:
- `settings.title` - Title on settings page
- `home.hero.greeting` - Hero greeting on home page
- `common.buttons.submit` - Submit button across the app

## Parameter Interpolation

Use `{{variableName}}` syntax for dynamic values:

```typescript
// Translation definition
'user.greeting': 'Hello, {{name}}! You have {{count}} messages.'

// Usage
t('user.greeting', { name: 'Alice', count: 5 })
// Output: "Hello, Alice! You have 5 messages."
```

## Example Project Structure

```
my-app/
├── src/
│   ├── i18n/
│   │   ├── index.ts           # Provider and hook exports
│   │   ├── I18nProvider.tsx   # Provider component
│   │   └── translations.ts   # Translation definitions
│   ├── components/
│   │   └── Header.tsx
│   └── App.tsx
```

## Real-World Example

This library is used in [CodexMonitor](https://github.com/your-username/CodexMonitor), a Tauri-based desktop application.

## License

MIT License - feel free to use in your projects!

## Contributing

Contributions are welcome! Please feel free to submit issues and pull requests.
