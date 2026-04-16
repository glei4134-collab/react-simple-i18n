import React, { useState } from "react";
import { I18nProvider, useI18n, type Translations, type Locale } from "./types";

// Sample translations
const translations: Translations = {
  en: {
    "app.title": "React Simple i18n",
    "app.subtitle": "A lightweight internationalization library",
    "counter.increment": "Increment",
    "counter.decrement": "Decrement",
    "counter.reset": "Reset",
    "counter.count": "Count: {{count}}",
    "settings.title": "Settings",
    "settings.language": "Language",
    "settings.theme": "Theme",
    "settings.theme.light": "Light",
    "settings.theme.dark": "Dark",
    "greeting.formal": "Hello, {{name}}!",
    "greeting.informal": "Hey {{name}}, what's up?",
  },
  "zh-CN": {
    "app.title": "React 简单国际化",
    "app.subtitle": "轻量级国际化库",
    "counter.increment": "增加",
    "counter.decrement": "减少",
    "counter.reset": "重置",
    "counter.count": "计数：{{count}}",
    "settings.title": "设置",
    "settings.language": "语言",
    "settings.theme": "主题",
    "settings.theme.light": "浅色",
    "settings.theme.dark": "深色",
    "greeting.formal": "你好，{{name}}！",
    "greeting.informal": "嘿 {{name}}，怎么样？",
  },
};

function Counter() {
  const { t } = useI18n();
  const [count, setCount] = useState(0);

  return (
    <div style={{ margin: "20px 0", padding: "20px", border: "1px solid #ccc", borderRadius: "8px" }}>
      <h2>{t("app.title")}</h2>
      <p>{t("app.subtitle")}</p>

      <div style={{ marginTop: "20px" }}>
        <p style={{ fontSize: "24px", fontWeight: "bold" }}>
          {t("counter.count", { count: count.toString() })}
        </p>

        <div style={{ display: "flex", gap: "10px", marginTop: "15px" }}>
          <button onClick={() => setCount(c => c - 1)}>
            {t("counter.decrement")}
          </button>
          <button onClick={() => setCount(0)}>
            {t("counter.reset")}
          </button>
          <button onClick={() => setCount(c => c + 1)}>
            {t("counter.increment")}
          </button>
        </div>
      </div>
    </div>
  );
}

function Settings({ currentLocale, onLocaleChange }: {
  currentLocale: Locale;
  onLocaleChange: (locale: Locale) => void;
}) {
  const { t } = useI18n();

  return (
    <div style={{ margin: "20px 0", padding: "20px", border: "1px solid #ccc", borderRadius: "8px" }}>
      <h3>{t("settings.title")}</h3>

      <div style={{ marginTop: "15px" }}>
        <label>{t("settings.language")}: </label>
        <select
          value={currentLocale}
          onChange={(e) => onLocaleChange(e.target.value as Locale)}
        >
          <option value="en">English</option>
          <option value="zh-CN">简体中文</option>
        </select>
      </div>
    </div>
  );
}

function GreetingSection() {
  const { t } = useI18n();

  return (
    <div style={{ margin: "20px 0", padding: "20px", border: "1px solid #ccc", borderRadius: "8px" }}>
      <h3>Parameter Interpolation Examples</h3>

      <div style={{ marginTop: "15px" }}>
        <p>{t("greeting.formal", { name: "Alice" })}</p>
        <p>{t("greeting.informal", { name: "Bob" })}</p>
      </div>
    </div>
  );
}

export function App() {
  const [locale, setLocale] = useState<Locale>("en");

  return (
    <I18nProvider locale={locale} translations={translations} defaultLocale="en">
      <div style={{ maxWidth: "600px", margin: "40px auto", padding: "20px" }}>
        <Counter />
        <Settings currentLocale={locale} onLocaleChange={setLocale} />
        <GreetingSection />
      </div>
    </I18nProvider>
  );
}

export default App;
