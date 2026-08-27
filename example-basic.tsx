import React, { useState } from "react";
import { I18nProvider, useI18n, type Translations, type Locale } from "./types";

// Comprehensive translation dictionaries supporting both nested and flat keys
const translations: Translations = {
  en: {
    app: {
      title: "React Simple i18n",
      subtitle: "A lightweight, zero-dependency internationalization library for React",
    },
    user: {
      greeting: "Hello, {{name}}! Welcome to our platform.",
      stats: "You have {{count}} unread notification(s).",
    },
    cart: {
      items_zero: "Your shopping cart is empty.",
      items_one: "You have 1 item in your cart.",
      items_other: "You have {{count}} items in your cart.",
    },
    settings: {
      title: "Language & Settings",
      language: "Choose Language",
      theme: "Theme",
      light: "Light",
      dark: "Dark",
    },
    // Also supports flat keys seamlessly
    "actions.submit": "Submit Order",
    "actions.cancel": "Cancel",
  },
  "zh-CN": {
    app: {
      title: "React Simple i18n",
      subtitle: "面向 React 的零依赖、超轻量级现代化国际化多语言组件库",
    },
    user: {
      greeting: "你好，{{name}}！欢迎来到系统平台。",
      stats: "您有 {{count}} 条未读通知。",
    },
    cart: {
      items_zero: "您的购物车是空的。",
      items_one: "您的购物车中有 1 件商品。",
      items_other: "您的购物车中有 {{count}} 件商品。",
    },
    settings: {
      title: "语言与系统偏好",
      language: "选择语言",
      theme: "主题",
      light: "浅色模式",
      dark: "深色模式",
    },
    "actions.submit": "提交订单",
    "actions.cancel": "取消",
  },
};

function Header() {
  const { t } = useI18n();
  return (
    <header style={{ borderBottom: "1px solid #e2e8f0", paddingBottom: "16px", marginBottom: "24px" }}>
      <h1 style={{ fontSize: "28px", fontWeight: "bold", color: "#1e293b", margin: 0 }}>
        {t("app.title")}
      </h1>
      <p style={{ color: "#64748b", marginTop: "8px", fontSize: "16px" }}>
        {t("app.subtitle")}
      </p>
    </header>
  );
}

function UserGreeting() {
  const { t } = useI18n();
  return (
    <section style={{ background: "#f8fafc", padding: "16px", borderRadius: "8px", marginBottom: "20px" }}>
      <h3 style={{ margin: "0 0 8px 0", color: "#334155" }}>🎯 Parameter Interpolation</h3>
      <p style={{ margin: "4px 0", color: "#475569" }}>
        {t("user.greeting", { name: "Alex" })}
      </p>
    </section>
  );
}

function CartCounter() {
  const { t } = useI18n();
  const [itemCount, setItemCount] = useState<number>(0);

  return (
    <section style={{ background: "#f8fafc", padding: "16px", borderRadius: "8px", marginBottom: "20px" }}>
      <h3 style={{ margin: "0 0 8px 0", color: "#334155" }}>🔢 Pluralization Example</h3>
      <p style={{ fontSize: "18px", fontWeight: "600", color: "#0f172a", margin: "12px 0" }}>
        {t("cart.items", { count: itemCount })}
      </p>
      <div style={{ display: "flex", gap: "8px" }}>
        <button
          onClick={() => setItemCount((c) => Math.max(0, c - 1))}
          style={{ padding: "6px 14px", borderRadius: "6px", border: "1px solid #cbd5e1", cursor: "pointer" }}
        >
          - Remove Item
        </button>
        <button
          onClick={() => setItemCount(0)}
          style={{ padding: "6px 14px", borderRadius: "6px", border: "1px solid #cbd5e1", cursor: "pointer" }}
        >
          Clear
        </button>
        <button
          onClick={() => setItemCount((c) => c + 1)}
          style={{ padding: "6px 14px", borderRadius: "6px", background: "#3b82f6", color: "#fff", border: "none", cursor: "pointer" }}
        >
          + Add Item
        </button>
      </div>
    </section>
  );
}

function SettingsBar({
  currentLocale,
  onLocaleChange,
}: {
  currentLocale: Locale;
  onLocaleChange: (locale: Locale) => void;
}) {
  const { t, locales } = useI18n();

  return (
    <footer style={{ marginTop: "24px", paddingTop: "16px", borderTop: "1px solid #e2e8f0" }}>
      <label style={{ fontWeight: "600", marginRight: "12px", color: "#334155" }}>
        {t("settings.language")}:
      </label>
      <select
        value={currentLocale}
        onChange={(e) => onLocaleChange(e.target.value)}
        style={{ padding: "6px 12px", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "14px" }}
      >
        {locales.map((loc) => (
          <option key={loc} value={loc}>
            {loc === "zh-CN" ? "🇨🇳 简体中文 (zh-CN)" : "🇺🇸 English (en)"}
          </option>
        ))}
      </select>
    </footer>
  );
}

export function App() {
  const [locale, setLocale] = useState<Locale>("zh-CN");

  return (
    <I18nProvider locale={locale} translations={translations} defaultLocale="en">
      <div style={{ maxWidth: "680px", margin: "40px auto", padding: "24px", fontFamily: "sans-serif", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)", borderRadius: "12px", background: "#ffffff" }}>
        <Header />
        <UserGreeting />
        <CartCounter />
        <SettingsBar currentLocale={locale} onLocaleChange={setLocale} />
      </div>
    </I18nProvider>
  );
}

export default App;