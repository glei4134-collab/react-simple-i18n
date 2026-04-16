# react-simple-i18n

> **版本**: 1.0.0  
> **源项目**: [CodexMonitor](https://github.com/glei4134-collab/CodexMonitor) - A Tauri-based desktop application for orchestrating Codex agents

A lightweight, zero-dependency internationalization (i18n) library for React applications.

## 📦 特性

- ✅ **零依赖** - 无需安装任何外部库
- ✅ **TypeScript 支持** - 完整的类型定义
- ✅ **简单 API** - 易于学习和使用
- ✅ **参数插值** - 支持 `{{variable}}` 语法
- ✅ **灵活结构** - 支持任意翻译结构
- ✅ **自动回退** - 翻译缺失时自动回退到默认语言
- ✅ **React 18+** - 支持最新 React 版本

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

## 🔗 源项目引用

**CodexMonitor** - 本库提取自 CodexMonitor 项目

- **GitHub**: https://github.com/glei4134-collab/CodexMonitor
- **项目描述**: 使用 Tauri 构建的桌面应用，用于编排本地的 Codex agents
- **i18n 实现**: https://github.com/glei4134-collab/CodexMonitor/tree/master/src/i18n

本库提取了 CodexMonitor 中的国际化功能，提供了一个轻量、独立的 React i18n 解决方案。

## 🎯 支持的环境

- **Node.js**: 16+
- **React**: 16.8.0+ (需要 React Hooks)
- **浏览器**: 现代浏览器 (Chrome, Firefox, Safari, Edge)
- **打包工具**: Vite, Webpack, Parcel, Rollup

## ⚙️ 技术要求

- **React**: 需要 React 16.8.0 或更高版本（支持 Hooks）
- **TypeScript**: 可选，但推荐使用（提供完整类型提示）
- **无其他依赖**: 纯 React + TypeScript 实现

## 📚 使用示例

### 基础用法

```tsx
import { I18nProvider, useI18n } from 'react-simple-i18n';

// 定义翻译
const translations = {
  en: {
    'app.title': 'My App',
    'greeting': 'Hello, {{name}}!',
  },
  'zh-CN': {
    'app.title': '我的应用',
    'greeting': '你好，{{name}}！',
  },
};

function App() {
  return (
    <I18nProvider locale="zh-CN" translations={translations}>
      <MyComponent />
    </I18nProvider>
  );
}

function MyComponent() {
  const { t, locale } = useI18n();
  return (
    <div>
      <h1>{t('app.title')}</h1>
      <p>{t('greeting', { name: 'World' })}</p>
    </div>
  );
}
```

## 🚀 性能特性

- **轻量**: 压缩后约 1KB
- **高性能**: 使用 `useMemo` 缓存翻译函数
- **Tree-shaking**: 支持按需导入
- **无运行时开销**: 翻译结构在构建时确定

## 🔧 高级用法

### 🌐 动态语言切换（详细说明）

#### 方式 1: 下拉选择器切换
```tsx
import { I18nProvider, useI18n } from 'react-simple-i18n';

// 语言选择组件
function LanguageSwitcher() {
  const { locale } = useI18n();
  const [currentLocale, setCurrentLocale] = useState(locale);

  const handleChange = (newLocale) => {
    setCurrentLocale(newLocale);
  };

  return (
    <select 
      value={currentLocale} 
      onChange={(e) => handleChange(e.target.value)}
    >
      <option value="en">English</option>
      <option value="zh-CN">简体中文</option>
      <option value="ja">日本語</option>
      <option value="ko">한국어</option>
    </select>
  );
}

// 使用示例
function App() {
  const [locale, setLocale] = useState('en');
  
  return (
    <I18nProvider 
      locale={locale} 
      translations={translations}
      defaultLocale="en"
    >
      <div>
        <LanguageSwitcher />
        <MainContent />
      </div>
    </I18nProvider>
  );
}
```

#### 方式 2: 按钮切换
```tsx
function LanguageButtons() {
  const { locale } = useI18n();

  const languages = [
    { code: 'en', label: '🇺🇸 English' },
    { code: 'zh-CN', label: '🇨🇳 简体中文' },
    { code: 'ja', label: '🇯🇵 日本語' },
  ];

  return (
    <div>
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => setLocale(lang.code)}
          style={{ 
            fontWeight: locale === lang.code ? 'bold' : 'normal' 
          }}
        >
          {lang.label}
        </button>
      ))}
    </div>
  );
}
```

#### 方式 3: 从后端/存储加载语言设置
```tsx
function App() {
  const [locale, setLocale] = useState('en');

  // 从 localStorage 加载保存的语言
  useEffect(() => {
    const savedLocale = localStorage.getItem('app-locale');
    if (savedLocale) {
      setLocale(savedLocale);
    }
  }, []);

  // 保存语言选择
  const handleLocaleChange = (newLocale) => {
    setLocale(newLocale);
    localStorage.setItem('app-locale', newLocale);
  };

  return (
    <I18nProvider locale={locale} translations={translations}>
      <LanguageSwitcher onChange={handleLocaleChange} />
      <Content />
    </I18nProvider>
  );
}
```

#### 方式 4: 根据浏览器语言自动设置
```tsx
function getBrowserLocale() {
  const browserLang = navigator.language || navigator.userLanguage;
  
  // 匹配支持的语言
  const supportedLocales = ['en', 'zh-CN', 'ja', 'ko'];
  const browserLocale = browserLang.split('-')[0];
  
  // 检查是否支持
  const fullMatch = supportedLocales.find(loc => browserLang.startsWith(loc));
  const shortMatch = supportedLocales.find(loc => loc.startsWith(browserLocale));
  
  return fullMatch || shortMatch || 'en';
}

function App() {
  const [locale, setLocale] = useState(getBrowserLocale);
  
  return (
    <I18nProvider locale={locale} translations={translations}>
      <Content />
    </I18nProvider>
  );
}
```

### 嵌套翻译键

```tsx
// 翻译定义
const translations = {
  en: {
    'settings': {
      'title': 'Settings',
      'language': {
        'label': 'Language',
        'en': 'English',
        'zh-CN': 'Chinese',
      },
    },
  },
};

// 使用
t('settings.title')           // "Settings"
t('settings.language.label')  // "Language"
```

## ⚠️ 限制

- **不支持复数形式**: 如需复数支持，请自行扩展
- **不支持日期/数字格式化**: 可结合 `Intl` API 使用
- **不支持语言检测**: 需要自行实现语言检测逻辑

## 📄 许可证

MIT License - 可以在你的项目中使用！

## 🤝 贡献

欢迎贡献代码！请提交 Issue 或 Pull Request。
