# NodeSecure i18n
![version](https://img.shields.io/badge/dynamic/json.svg?style=for-the-badge&url=https://raw.githubusercontent.com/NodeSecure/i18n/master/package.json&query=$.version&label=Version)
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg?style=for-the-badge)](https://github.com/NodeSecure/i18n/graphs/commit-activity)
[![OpenSSF
Scorecard](https://api.securityscorecards.dev/projects/github.com/NodeSecure/i18n/badge?style=for-the-badge)](https://api.securityscorecards.dev/projects/github.com/NodeSecure/i18n)
[![mit](https://img.shields.io/github/license/Naereen/StrapDown.js.svg?style=for-the-badge)](https://github.com/NodeSecure/i18n/blob/master/LICENSE)
![build](https://img.shields.io/github/actions/workflow/status/NodeSecure/i18n/node.js.yml?style=for-the-badge)

Internationalization (**i18n**) utilities for NodeSecure tools like [CLI](https://github.com/NodeSecure/cli). 

Supported languages:
- french
- english

## Requirements
- [Node.js](https://nodejs.org/en/) v14 or higher

## Getting Started

This package is available in the Node Package Repository and can be easily installed with [npm](https://docs.npmjs.com/getting-started/what-is-npm) or [yarn](https://yarnpkg.com).

```bash
$ npm i @nodesecure/i18n
# or
$ yarn add @nodesecure/i18n
```

## Usage example

```js
import * as i18n from "@nodesecure/i18n";

await i18n.setLocalLang("french");

console.log(i18n.getToken("cli.executing_at"));

// Using parameters
console.log(i18n.getToken("cli.min_nodejs_version", "14"));
```

You can consult the real use case of the API in the following codes: [here](https://github.com/NodeSecure/cli/blob/master/src/commands/lang.js) and [here](https://github.com/NodeSecure/cli/blob/master/src/commands/vulnerability.js).

## API

See TypeScript definition file.

```ts
type languages = "french" | "english";

export function getLocalLang(): Promise<languages>;
export function setLocalLang(newLanguage: languages): Promise<void>;
export function getToken(token: string, ...parameters): Promise<string>;
export function getTokenSync(token: string, ...parameters): string;
export function getLanguages(): Promise<languages[]>;
export function taggedString(str: string, ...keys: any[]): (...keys: any[]) => string;
export function extend(language: string, tokens: Record<string, any>): void;
export function extendFromSystemPath(path: string): void;
```

> **Note**
> Local lang must be updated otherwise `getTokenSync()` will throws. Make sure to use `await i18n.getLocalLang()` before any synchronous usage.

## Generate documentation

You can generate a static webpage by using the `build:documentation` npm script:

```bash
$ npm run build:documentation
```

## Contributing
Feel free to add a new language. You need to take inspiration from the two supported languages and replicate the same keys.

Then export it in the `index.js` file (example if we want to add a chinese translation).

```js
export * as chinese  from "./chinese.js";
```

## Contributors ✨

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-13-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://www.linkedin.com/in/thomas-gentilhomme/"><img src="https://avatars.githubusercontent.com/u/4438263?v=4?s=100" width="100px;" alt="Gentilhomme"/><br /><sub><b>Gentilhomme</b></sub></a><br /><a href="https://github.com/NodeSecure/i18n/commits?author=fraxken" title="Code">💻</a> <a href="https://github.com/NodeSecure/i18n/commits?author=fraxken" title="Documentation">📖</a> <a href="https://github.com/NodeSecure/i18n/pulls?q=is%3Apr+reviewed-by%3Afraxken" title="Reviewed Pull Requests">👀</a> <a href="#security-fraxken" title="Security">🛡️</a> <a href="https://github.com/NodeSecure/i18n/issues?q=author%3Afraxken" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/Rossb0b"><img src="https://avatars.githubusercontent.com/u/39910164?v=4?s=100" width="100px;" alt="Nicolas Hallaert"/><br /><sub><b>Nicolas Hallaert</b></sub></a><br /><a href="https://github.com/NodeSecure/i18n/commits?author=Rossb0b" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/QuentinLpy"><img src="https://avatars.githubusercontent.com/u/31780359?v=4?s=100" width="100px;" alt="Quentin Lepateley"/><br /><sub><b>Quentin Lepateley</b></sub></a><br /><a href="https://github.com/NodeSecure/i18n/commits?author=QuentinLpy" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://antoineneff.me"><img src="https://avatars.githubusercontent.com/u/9216777?v=4?s=100" width="100px;" alt="Antoine Neff"/><br /><sub><b>Antoine Neff</b></sub></a><br /><a href="#translation-antoineneff" title="Translation">🌍</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://www.linkedin.com/in/kvoyer"><img src="https://avatars.githubusercontent.com/u/33313541?v=4?s=100" width="100px;" alt="Kévin VOYER"/><br /><sub><b>Kévin VOYER</b></sub></a><br /><a href="#translation-kecsou" title="Translation">🌍</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/AlexandreMalaj"><img src="https://avatars.githubusercontent.com/u/32218832?v=4?s=100" width="100px;" alt="Alexandre Malaj"/><br /><sub><b>Alexandre Malaj</b></sub></a><br /><a href="#translation-AlexandreMalaj" title="Translation">🌍</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/Kawacrepe"><img src="https://avatars.githubusercontent.com/u/40260517?v=4?s=100" width="100px;" alt="Vincent Dhennin"/><br /><sub><b>Vincent Dhennin</b></sub></a><br /><a href="https://github.com/NodeSecure/i18n/commits?author=Kawacrepe" title="Code">💻</a> <a href="https://github.com/NodeSecure/i18n/commits?author=Kawacrepe" title="Documentation">📖</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/Mathieuka"><img src="https://avatars.githubusercontent.com/u/34446722?v=4?s=100" width="100px;" alt="Mathieu"/><br /><sub><b>Mathieu</b></sub></a><br /><a href="https://github.com/NodeSecure/i18n/commits?author=Mathieuka" title="Code">💻</a> <a href="#translation-Mathieuka" title="Translation">🌍</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://dev.to/antoinecoulon"><img src="https://avatars.githubusercontent.com/u/43391199?v=4?s=100" width="100px;" alt="Antoine Coulon"/><br /><sub><b>Antoine Coulon</b></sub></a><br /><a href="#maintenance-antoine-coulon" title="Maintenance">🚧</a> <a href="https://github.com/NodeSecure/i18n/pulls?q=is%3Apr+reviewed-by%3Aantoine-coulon" title="Reviewed Pull Requests">👀</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://codebreaker.fr/"><img src="https://avatars.githubusercontent.com/u/53506859?v=4?s=100" width="100px;" alt="im_codebreaker"/><br /><sub><b>im_codebreaker</b></sub></a><br /><a href="https://github.com/NodeSecure/i18n/commits?author=im-codebreaker" title="Code">💻</a> <a href="https://github.com/NodeSecure/i18n/commits?author=im-codebreaker" title="Documentation">📖</a> <a href="#design-im-codebreaker" title="Design">🎨</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/PierreDemailly"><img src="https://avatars.githubusercontent.com/u/39910767?v=4?s=100" width="100px;" alt="PierreDemailly"/><br /><sub><b>PierreDemailly</b></sub></a><br /><a href="https://github.com/NodeSecure/i18n/commits?author=PierreDemailly" title="Code">💻</a> <a href="#translation-PierreDemailly" title="Translation">🌍</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/fabnguess"><img src="https://avatars.githubusercontent.com/u/72697416?v=4?s=100" width="100px;" alt="Kouadio Fabrice Nguessan"/><br /><sub><b>Kouadio Fabrice Nguessan</b></sub></a><br /><a href="https://github.com/NodeSecure/i18n/commits?author=fabnguess" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/ayushmaanshrotriya"><img src="https://avatars.githubusercontent.com/u/65903307?v=4?s=100" width="100px;" alt="Ayushmaan Shrotriya"/><br /><sub><b>Ayushmaan Shrotriya</b></sub></a><br /><a href="https://github.com/NodeSecure/i18n/commits?author=ayushmaanshrotriya" title="Documentation">📖</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

## License
MIT
