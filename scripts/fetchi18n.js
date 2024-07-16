#!/usr/bin/env node

// Import Node.js Dependencies
import fs from "node:fs";
import path from "node:path";
import { styleText } from "node:util";

// Import Third-party Dependencies
import * as github from "@nodesecure/github";

const repos = {
  scanner: "workspaces/scanner/src/i18n",
  cli: "i18n"
};

for (const [repo, i18nFolderPath] of Object.entries(repos)) {
  const { location } = await github.downloadAndExtract(`NodeSecure.${repo}`, { branch: "master" });
  const i18nPath = path.join(location, i18nFolderPath);

  console.log(styleText(["bold", "green"], `[INFO]`), `i18nPath: ${i18nPath}`);

  const french = fs.readFileSync(path.join(i18nPath, "french.js"), "utf-8");
  const english = fs.readFileSync(path.join(i18nPath, "english.js"), "utf-8");

  const frenchFilePath = path.join(process.cwd(), "externalLanguages", repo, "french.js");
  const englishFilePath = path.join(process.cwd(), "externalLanguages", repo, "english.js");

  fs.mkdirSync(path.dirname(frenchFilePath), { recursive: true });
  fs.mkdirSync(path.dirname(englishFilePath), { recursive: true });
  
  if (repo === "cli") {
    fs.writeFileSync(frenchFilePath, french.replace(
        "import { taggedString as tS } from \"@nodesecure/i18n\";",
        "import { taggedString as tS } from \"../../src/utils.js\";"
    )),
    fs.writeFileSync(englishFilePath, english.replace(
      "import { taggedString as tS } from \"@nodesecure/i18n\";",
      "import { taggedString as tS } from \"../../src/utils.js\";"
  ));
  } else {
    fs.writeFileSync(frenchFilePath, french);
    fs.writeFileSync(englishFilePath, english);
  }  

  fs.rmSync(location, { recursive: true, force: true });
}

