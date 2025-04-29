
import React, { createContext, useContext, useState, useEffect } from "react";

type Language = "en" | "zh" | "ms";

type Translations = {
  [key: string]: {
    [key in Language]: string;
  };
};

const translations: Translations = {
  // Common
  settings: {
    en: "Settings",
    zh: "设置",
    ms: "Tetapan",
  },
  profile: {
    en: "Profile",
    zh: "个人资料",
    ms: "Profil",
  },
  security: {
    en: "Security",
    zh: "安全",
    ms: "Keselamatan",
  },
  language: {
    en: "Language",
    zh: "语言",
    ms: "Bahasa",
  },
  appearance: {
    en: "Appearance",
    zh: "外观",
    ms: "Penampilan",
  },
  plan: {
    en: "Subscription Plan",
    zh: "订阅计划",
    ms: "Pelan Langganan",
  },
  dark_mode: {
    en: "Dark Mode",
    zh: "深色模式",
    ms: "Mod Gelap",
  },
  save: {
    en: "Save",
    zh: "保存",
    ms: "Simpan",
  },
  saved: {
    en: "Saved",
    zh: "已保存",
    ms: "Disimpan",
  },
  cancel: {
    en: "Cancel",
    zh: "取消",
    ms: "Batal",
  },
  english: {
    en: "English",
    zh: "英语",
    ms: "Bahasa Inggeris",
  },
  chinese: {
    en: "Mandarin",
    zh: "中文",
    ms: "Bahasa Mandarin",
  },
  malay: {
    en: "Bahasa Malaysia",
    zh: "马来语",
    ms: "Bahasa Malaysia",
  },
  change_password: {
    en: "Change Password",
    zh: "更改密码",
    ms: "Tukar Kata Laluan",
  },
  current_password: {
    en: "Current Password",
    zh: "当前密码",
    ms: "Kata Laluan Semasa",
  },
  new_password: {
    en: "New Password",
    zh: "新密码",
    ms: "Kata Laluan Baharu",
  },
  confirm_new_password: {
    en: "Confirm New Password",
    zh: "确认新密码",
    ms: "Sahkan Kata Laluan Baharu",
  },
  name: {
    en: "Name",
    zh: "名称",
    ms: "Nama",
  },
  email: {
    en: "Email",
    zh: "电子邮件",
    ms: "E-mel",
  },
  free_plan: {
    en: "Free Plan",
    zh: "免费计划",
    ms: "Pelan Percuma",
  },
  premium_plan: {
    en: "Premium Plan",
    zh: "高级计划",
    ms: "Pelan Premium",
  },
  current_plan: {
    en: "Current Plan",
    zh: "当前计划",
    ms: "Pelan Semasa",
  },
  upgrade_plan: {
    en: "Upgrade Plan",
    zh: "升级计划",
    ms: "Naik Taraf Pelan",
  },
  update_profile: {
    en: "Update Profile",
    zh: "更新个人资料",
    ms: "Kemaskini Profil",
  },
  password_success: {
    en: "Password updated successfully",
    zh: "密码更新成功",
    ms: "Kata laluan berjaya dikemas kini",
  },
  profile_success: {
    en: "Profile updated successfully",
    zh: "个人资料更新成功",
    ms: "Profil berjaya dikemas kini",
  },
  password_error: {
    en: "Failed to update password",
    zh: "更新密码失败",
    ms: "Gagal mengemas kini kata laluan",
  },
  profile_error: {
    en: "Failed to update profile",
    zh: "更新个人资料失败",
    ms: "Gagal mengemas kini profil",
  },
};

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
};

const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
  t: (key) => key,
});

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const savedLanguage = localStorage.getItem("bicaraLanguage");
    return (savedLanguage as Language) || "en";
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("bicaraLanguage", lang);
  };

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
