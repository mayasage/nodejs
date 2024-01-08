import fs, { readFileSync } from "fs";
import { syncBuiltinESMExports } from "module";

let orig = fs.readFileSync;

// Change to mock in DEFAULT export
fs.readFileSync = () => Buffer.from("Hello, ESM");
syncBuiltinESMExports();

console.log(fs.readFileSync === readFileSync); // true

// Change to original in DEFAULT export
fs.readFileSync = orig;
syncBuiltinESMExports();

console.log(fs.readFileSync === readFileSync); // true
