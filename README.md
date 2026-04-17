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
- ✅ **React 16.8+** - 支持 Hooks 的所有 React 版本

## 🚀 快速开始

### 1. 安装

```bash
npm install react-simple-i18n
```

或使用 yarn：

```bash
yarn add react-simple-i18n
```

### 2. 定义翻译

```typescript
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

### 3. 包装应用

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

### 4. 在组件中使用

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

## 📖 API 参考

### `<I18nProvider>`

提供 i18n 上下文的组件。

**Props:**
- `locale` (string, 必填) - 当前语言标识符
- `translations` (Translations, 必填) - 翻译对象
- `defaultLocale` (string, 可选) - 回退语言 (默认: 'en')
- `children` (ReactNode, 必填) - 子组件

### `useI18n()`

返回 i18n 上下文值的 Hook。

**返回:**
- `locale` (string) - 当前语言
- `t` (function) - 翻译函数

### `t(key, params?)`

翻译函数。

**参数:**
- `key` (string, 必填) - 翻译键 (如 'settings.title')
- `params` (object, 可选) - 插值参数

**返回:** 翻译后的字符串

## 🔧 高级用法

### 动态语言切换

```tsx
function LanguageSwitcher() {
  const [locale, setLocale] = useState('en');
  
  return (
    <select 
      value={locale} 
      onChange={(e) => setLocale(e.target.value)}
    >
      <option value="en">English</option>
      <option value="zh-CN">简体中文</option>
    </select>
  );
}
```

### 参数插值

```typescript
// 翻译定义
'user.greeting': 'Hello, {{name}}! You have {{count}} messages.'

// 使用
t('user.greeting', { name: 'Alice', count: 5 })
// 输出: "Hello, Alice! You have 5 messages."
```

### 直接复制使用（无需 npm）

如果你的项目不想添加 npm 依赖，可以直接复制 `types.ts` 文件到你的项目中。

## 📂 项目结构

```
react-simple-i18n/
├── types.ts              # 核心实现（唯一必需文件）
├── index.ts              # 导出文件
├── package.json          # npm 配置
├── tsconfig.json         # TypeScript 配置
└── README.md             # 文档
```

## 🎯 支持的环境

- **Node.js**: 16+
- **React**: 16.8.0+ (需要 Hooks)
- **浏览器**: 现代浏览器 (Chrome, Firefox, Safari, Edge)
- **打包工具**: Vite, Webpack, Parcel, Rollup

## ⚡ 性能

- **轻量**: 压缩后约 1KB
- **高性能**: 使用 `useMemo` 缓存
- **Tree-shaking**: 支持按需导入

## 🔗 源项目

本库提取自 [CodexMonitor](https://github.com/glei4134-collab/CodexMonitor) 项目。

- **GitHub**: https://github.com/glei4134-collab/CodexMonitor
- **i18n 实现**: https://github.com/glei4134-collab/CodexMonitor/tree/master/src/i18n

## 📄 许可证

MIT License - 可以在你的项目中使用！

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！