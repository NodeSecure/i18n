#!/usr/bin/env node

// Import Node.js Dependencies
import fs from "node:fs";
import path from "node:path";
import { parseArgs } from "node:util";

// Import Third-party Dependencies
import { Spinner } from "@topcli/spinner";
import * as github from "@nodesecure/github";

// Import Internal Dependencies
import { extendFromSystemPath } from "../index.js";


// CONSTANTS
const kGitHubApiUrl = "https://api.github.com";

console.log("Start downloading translation files");
const { values: argsValues } = parseArgs({
  options: {
    repo: {
      type: "string",
      short: "r",
      default: [],
      multiple: true
    },
    branch: {
      type: "string",
      short: "b",
      default: ["main"],
      multiple: true
    }
  }
});

const repos = argsValues.repo;
const branches = argsValues.branch;

const spinner = new Spinner().start("Start downloading translation files");

for (const [index, repo] of repos.entries()) {
  spinner.text = `Checking the existence of the depo : ${repo}`;

  const repoUrl = new URL(`/repos/NodeSecure/${repo}`, kGitHubApiUrl);

  const { status } = await fetch(repoUrl);

  if (status !== 200) {
    spinner.failed(`Repository NodeSecure/${repo} does not exist.`);
    process.exit(1);
  }

  spinner.text = `Downloading and extracting : NodeSecure/${repo}`;
  const { location } = await github.downloadAndExtract(`NodeSecure.${repo}`, { branch: branches[index] });

  const i18nPath = path.join(location, "i18n");

  if (!fs.existsSync(i18nPath)) {
    spinner.failed(`NodeSecure/${repo} does not have a /i18n folder`);
    process.exit(1);
  }

  await extendFromSystemPath(i18nPath);
  fs.rmdirSync(location, { force: true, recursive: true });
}

spinner.succeed(`Done! Added exports in ${spinner.elapsedTime.toFixed(2)}ms !`);
Spinner.reset();

