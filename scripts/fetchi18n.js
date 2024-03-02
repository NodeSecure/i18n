#!/usr/bin/env node

// Import Node.js Dependencies
import fs from "node:fs";
import path from "node:path";
import { parseArgs } from "node:util";

// Import Third-party Dependencies
import kleur from "kleur";
import * as github from "@nodesecure/github";
import { extendFromSystemPath } from "../index.js";

const { values: argsValues } = parseArgs({
  options: {
    repo: {
      type: "string",
      short: "r",
      default: ""
    },
    branch: {
      type: "string",
      short: "b",
      default: "main"
    }
  }
});

async function fetchTranslations() {
  const { status } = await fetch(`https://api.github.com/repos/NodeSecure/${argsValues.repo}`);

  if (status !== 200) {
    console.log(kleur.red(`Repository NodeSecure/${argsValues.repo} does not exist.`));
    process.exit(1);
  }

  const { location } = await github.downloadAndExtract(`NodeSecure.${argsValues.repo}`, { branch: argsValues.branch });

  const i18nPath = path.join(location, "i18n");

  fs.access(i18nPath, fs.constants.F_OK, (err) => {
    if (err) {
      console.log(kleur.red(`NodeSecure/${argsValues.repo} does not have a /i18n folder`));
      process.exit(1);
    }
  });

  await extendFromSystemPath(i18nPath);
}


await fetchTranslations();
