import m1 from "./module1.js"; // works
import m2 from "./module2.js"; // works

if (true) {
  // import m1 from "./module1.mjs"; // won't work
} else {
  // import m2 from "./module2.mjs"; // won't work
}
