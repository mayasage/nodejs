const fs = require("fs");
const path = require("path");
const makeRandomSymbols = require("./make-random-symbols");

const tempDirPath = path.join(__dirname, "temp");
!fs.existsSync(tempDirPath) && fs.mkdirSync(tempDirPath);

class TestFile {
  constructor(file) {
    this.name = makeRandomSymbols(1) + ".js";
    this.path = path.join(tempDirPath, this.name);
    this.file = file;
  }

  create() {
    fs.writeFileSync(this.path, this.file);
  }

  delete() {
    fs.unlinkSync(this.path);
  }
}

module.exports = TestFile;
