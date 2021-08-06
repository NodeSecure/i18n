import test from "tape";

// Import Internal Dependencies
import { taggedString } from "../src/utils.js";

test("taggedString", (tape) => {
  const clojureHello = taggedString`Hello ${0}`;
  tape.strictEqual(clojureHello(), "Hello ");
  tape.strictEqual(clojureHello("world"), "Hello world");

  const clojureFoo = taggedString`Hello ${"word"}`;
  tape.strictEqual(clojureFoo({ word: "bar" }), "Hello bar");

  tape.end();
});
