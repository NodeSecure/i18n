/* eslint-disable no-sync */
import test from "tape";

import fs from "node:fs";
import path from "node:path";

// Import Third-party Depedencies
import cacache from "cacache";

// Import Internal Dependencies
import * as i18n from "../index.js";
import { CACHE_PATH } from "../src/constants.js";

const KI18nDir = "./i18n";

test("getToken: token must be a string", (tape) => {
  tape.throws(() => {
    i18n.getToken(10);
  }, "token must be a string");
  tape.end();
});

test("getToken: invalid token", (tape) => {
  tape.throws(() => {
    i18n.getToken("boo.foo");
  });
  tape.end();
});

test("getLocalLang: force update on the local lang!", async(tape) => {
  await cacache.rm.entry(CACHE_PATH, "cli-lang");

  i18n.CONSTANTS.LANG_UPDATED = true;
  i18n.getLocalLang();

  tape.strictEqual(i18n.CONSTANTS.LANG_UPDATED, false);
  tape.end();
});

test("getLocalLang should return english by default", async(tape) => {
  tape.strictEqual(i18n.getLocalLang(), "english");
  tape.end();
});

test("setLocalLang to french", async(tape) => {
  await i18n.setLocalLang("french");
  tape.strictEqual(i18n.getLocalLang(), "french");
  tape.end();
});


test("get languages", async(tape) => {
  await i18n.setLocalLang("french");
  tape.same(i18n.getLanguages(), ["french", "english"]);
  tape.end();
});

test("Extend existing language", (tape) => {
  i18n.extend("french", { welcome: "Bienvenue" });
  tape.deepEqual(i18n.getToken("welcome"), "Bienvenue");
  tape.end();
});

test("Add new language", async(tape) => {
  i18n.extend("spanish", { welcome: "Bienvenido" });
  await i18n.setLocalLang("spanish");
  tape.deepEqual(i18n.getToken("welcome"), "Bienvenido");
  tape.end();
});

test("extendFromSystemPath with non-existing languages directory", (tape) => {
  tape.throws(() => {
    i18n.extendFromSystemPath(KI18nDir);
  }, `The ${KI18nDir} directory does not exist on this project.`);
  tape.end();
});

test("extendFromSystemPath with existing languages directory", async(tape) => {
  try {
    fs.mkdirSync(KI18nDir);
    fs.writeFileSync(path.join(KI18nDir, "french.js"), JSON.stringify({ hello: "Bonjour" }));

    i18n.extendFromSystemPath(KI18nDir);

    await i18n.setLocalLang("french");

    tape.deepEqual(i18n.getToken("hello"), "Bonjour");
  }
  finally {
    fs.rmdirSync(KI18nDir, { force: true, recursive: true });
    tape.end();
  }
});
