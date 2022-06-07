// import Internal Dependencies
import { cli, depWalker, ui, warnings } from '../languages/french.js';

// CONSTANTS
const frCliKey = Object.entries(cli)
const frDepWalkerKey = Object.entries(depWalker)
const frUiKey = Object.entries(ui)
const frWarningsKey = Object.entries(warnings)

const frCliArray = []

for (const key of frCliKey) {
  frCliArray.push(Object.values(key))
}

console.log(frCliArray)
// for (const key of frenchKeys) {
//   frKeysArray.push(Object.entries(key))
// }
// console.log(frenchKeys)

// const list = Object.keys(cli);
// const cliValues = Object.values(cli);
// const entries = Object.entries(cli);

// entries.forEach(function (keys) {
//   if (Object.values(keys) !== '') {
//     Object.values(keys)
//   }
//   console.log(keys)
// })

