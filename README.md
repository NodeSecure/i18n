# npm tarball license parser
license parser

## Requirements
- [Node.js](https://nodejs.org/en/) v12 or higher

## Getting Started

This package is available in the Node Package Repository and can be easily installed with [npm](https://docs.npmjs.com/getting-started/what-is-npm) or [yarn](https://yarnpkg.com).

```bash
$ npm i ntlp
# or
$ yarn add ntlp
```

## Usage example

```js
import parseLicense from "@nodesource/ntlp";

async function main() {
    const license = await parseLicense(__dirname);
    console.log(license);
}
main().catch(console.error);
```

Return the following interface
```ts
interface license {
    uniqueLicenseIds: string[];
    spdxLicenseLinks: string[];
    spdx: {
        osi: boolean;
        fsf: boolean;
        fsfAndOsi: boolean;
        includesDeprecated: boolean;
    },
    from: string;
}

interface result {
    licenses: license[];
    uniqueLicenseIds: Set<string>;
}
```

## API

### parseLicense(dest: string): Promise< ntlp.result >
parse a given tarball directory and return a result interface.

## License
MIT
