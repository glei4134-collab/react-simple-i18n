# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2024-01-01

### Added
- Initial release
- `I18nProvider` component for wrapping the app
- `useI18n()` hook for accessing translations
- TypeScript support
- Parameter interpolation with `{{variable}}` syntax
- Fallback to default locale when translation is missing
- Example with CodexMonitor translations (English and Simplified Chinese)

## Features

### I18nProvider
- Accepts `locale`, `translations`, and optional `defaultLocale`
- Automatically falls back to default locale if current locale is not available
- Wraps React context for global i18n access

### useI18n Hook
- Returns current `locale` and translation function `t`
- Translation function supports parameter interpolation
- Works with any translation structure

### Translations
- Flexible object structure with locale keys
- Supports nested keys with dot notation
- Type-safe with TypeScript generics
