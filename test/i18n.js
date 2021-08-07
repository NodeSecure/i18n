import test from "tape";

// Import Third-party Depedencies
import cacache from "cacache";

// Import Internal Dependencies
import * as i18n from "../index.js";
import { CACHE_PATH } from "../src/constants.js";

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
  tape.strictEqual(i18n.getLocalLang(), "english")
  tape.end()
})

test("setLocalLang to english", async(tape) => {
  await i18n.setLocalLang("english");
  tape.strictEqual(i18n.getLocalLang(), "english")
  tape.end()
});
