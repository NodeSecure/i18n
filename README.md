# NodeSecure i18n
Internationalization utilities for NodeSecure Scanner and CLI.

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

## API

See TypeScript definition file.

```ts
type languages = "french" | "english";

export function getLocalLang(): languages;
export function setLocalLang(newLanguage: languages): Promise<void>;
export function getToken(token: string, ...parameters);
```

## License
MIT
