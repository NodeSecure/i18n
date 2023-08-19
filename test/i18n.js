/* eslint-disable no-sync */

// Import Node.js Dependencies
import fs from "node:fs";
import path from "node:path";
import { describe, it } from "node:test";
import assert from "node:assert";

// Import Third-party Depedencies
import cacache from "cacache";

// Import Internal Dependencies
import * as i18n from "../index.js";
import { CACHE_PATH } from "../src/constants.js";

const kI18nDir = "./i18n";

describe("getLocalLang/setLocalLang", () => {
  it("should force update on the local lang!", async() => {
    await cacache.rm.entry(CACHE_PATH, "cli-lang");

    i18n.CONSTANTS.LANG_UPDATED = true;
    await i18n.getLocalLang();

    const { data } = await cacache.get(CACHE_PATH, "cli-lang");

    assert.strictEqual(data.toString(), "english");
    assert.strictEqual(i18n.CONSTANTS.LANG_UPDATED, false);
  });

  it("should return english by default", async() => {
    assert.strictEqual(await i18n.getLocalLang(), "english");
  });

  it("setLocalLang to french", async() => {
    await i18n.setLocalLang("french");
    assert.strictEqual(await i18n.getLocalLang(), "french");
  });

  it("should return all languages (with active one as first)", async() => {
    await i18n.setLocalLang("french");
    const languages = await i18n.getLanguages();

    assert.strictEqual(languages.length, 2);
    assert.strictEqual(languages[0], "french");
    assert.strictEqual(languages[1], "english");
  });
});

describe("getToken", () => {
  it("should throw an Error when called with a token that's not a string primitive", async() => {
    await assert.rejects(
      i18n.getToken(10),
      {
        name: "TypeError",
        message: "token must be a string"
      }
    );
  });

  it("should throw an Error when called with an unknown token", async() => {
    const expectedToken = "boo.foo";

    await assert.rejects(
      i18n.getToken(expectedToken),
      {
        name: "Error",
        message: `Invalid i18n token -> ${expectedToken} for lang -> french`
      }
    );
  });

  it("should throw an Error when called with an unknown language", async() => {
    const expectedLang = "foobar";
    await i18n.setLocalLang(expectedLang);

    await assert.rejects(
      i18n.getToken("random.key"),
      {
        name: "Error",
        message: `Invalid i18n lang -> ${expectedLang}`
      }
    );
  });
});

describe("getTokenSync", () => {
  it("should throw an Error when called with a token that's not a string primitive", async() => {
    await i18n.getLocalLang();
    assert.throws(
      () => i18n.getTokenSync(10),
      {
        name: "TypeError",
        message: "token must be a string"
      }
    );
  });

  it("should throws if state is insure", async() => {
    await i18n.setLocalLang("french");
    assert.throws(
      () => i18n.getTokenSync("lang"),
      {
        name: "Error",
        message: "language has been updated, please run `await i18n.getLocalLang()` to make sure to use updated language"
      }
    );
  });

  it("should throw an Error when called with an unknown token", async() => {
    await i18n.getLocalLang();
    const expectedToken = "boo.foo";

    assert.throws(
      () => i18n.getTokenSync(expectedToken),
      {
        name: "Error",
        message: `Invalid i18n token -> ${expectedToken} for lang -> french`
      }
    );
  });

  it("should get translation", async() => {
    await i18n.getLocalLang();

    assert.strictEqual(i18n.getTokenSync("lang"), "fr");
  });
});

describe("extend", () => {
  it("should extend an existing language with new tokens", async() => {
    i18n.extend("french", {
      welcome: i18n.taggedString`Bienvenue ${0} et ${1}`
    });
    await i18n.setLocalLang("french");

    assert.deepEqual(
      await i18n.getToken("welcome", "thomas", "alexandre"),
      "Bienvenue thomas et alexandre"
    );
  });

  it("should add a new language if it doesn't exist", async() => {
    i18n.extend("spanish", { welcome: "Bienvenido" });

    await i18n.setLocalLang("spanish");
    assert.deepEqual(await i18n.getToken("welcome"), "Bienvenido");
  });
});

describe("extendFromSystemPath", () => {
  it("extendFromSystemPath with non-existing languages directory", () => {
    assert.throws(
      () => i18n.extendFromSystemPath(kI18nDir),
      {
        name: "Error",
        message: `The ${kI18nDir} directory does not exist on this project.`
      }
    );
  });

  it("extendFromSystemPath with existing languages directory", async() => {
    try {
      fs.mkdirSync(kI18nDir);
      fs.writeFileSync(
        path.join(kI18nDir, "french.js"),
        JSON.stringify({ hello: "Bonjour" })
      );

      i18n.extendFromSystemPath(kI18nDir);
      await i18n.setLocalLang("french");

      assert.deepEqual(await i18n.getToken("hello"), "Bonjour");
    }
    finally {
      fs.rmdirSync(kI18nDir, { force: true, recursive: true });
    }
  });
});
