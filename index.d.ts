declare namespace i18n {
  type languages = "french" | "english";

  export function getLocalLang(): Promise<languages>;
  export function setLocalLang(newLanguage: languages): Promise<void>;
  export function getToken(token: string, ...parameters): Promise<string>;
  export function getTokenSync(token: string, ...parameters): string;
  export function getLanguages(): Promise<languages[]>;
  export function taggedString(str: string, ...keys: any[]): (...keys: any[]) => string;
  export function extend(language: string, tokens: Record<string, any>): void;
  export function extendFromSystemPath(path: string): void;
}

export = i18n;
export as namespace i18n;
