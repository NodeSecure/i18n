declare namespace i18n {
  type languages = "french" | "english";

  export function getLocalLang(): languages;
  export function setLocalLang(newLanguage: languages): Promise<void>;
  export function getToken(token: string, ...parameters);
  export function getLanguages(): languages[];
  export function taggedString(str: string, ...keys: any[]): (...keys: any[]) => string;
  export function extend(language: string, tokens: Record<string, any>): void;
}

export = i18n;
export as namespace i18n;
