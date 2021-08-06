// Import Third-party Depedencies
import cacache from "cacache";
import lodashGet from "lodash.get";

// Import Internals
import { CACHE_PATH, CURRENT_LANG } from "./src/constants.js";
import * as languages from "./languages/index.js";

export const CONSTANTS = Object.seal({
  CACHE_PATH, CURRENT_LANG, LANG_UPDATED: true
});

export function getLocalLang() {
  if (CONSTANTS.LANG_UPDATED) {
    try {
      const { data } = cacache.get.sync(CACHE_PATH, "cli-lang");
      CONSTANTS.CURRENT_LANG = data.toString();
    }
    catch (error) {
      cacache.put(CACHE_PATH, "cli-lang", CURRENT_LANG);
      CONSTANTS.CURRENT_LANG = CURRENT_LANG;
    }
    CONSTANTS.LANG_UPDATED = false;
  }

  return CONSTANTS.CURRENT_LANG;
}

export async function setLocalLang(selectedLang) {
  await cacache.put(CACHE_PATH, "cli-lang", selectedLang);
}

export function getToken(token, ...params) {
  if (typeof token !== "string") {
    throw new TypeError("token must be a string");
  }

  const lang = getLocalLang();
  if (!Reflect.has(languages, lang)) {
    throw new Error(`Invalid i18n lang -> ${lang}`);
  }

  const langToken = lodashGet(languages[lang], token);
  if (typeof langToken === "undefined" || langToken === null) {
    throw new Error(`Invalid i18n token -> ${token} for lang -> ${lang}`);
  }

  return params.length === 0 ? langToken : langToken(...params);
}

