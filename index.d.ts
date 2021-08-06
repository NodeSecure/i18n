declare namespace i18n {
  type languages = "french" | "english";

  export function getLocalLang(): languages;
  export function setLocalLang(newLanguage: languages): Promise<void>;
  export function getToken(token: string, ...parameters);
}

export = i18n;
export as namespace i18n;
