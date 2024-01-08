import fs from "fs";

const originalReadFile = fs.readFile;
let mockedResponse = null; // Buffer

function mockedReadFile(path, cb) {
  setImmediate(() => {
    cb(null, mockedResponse);
  });
}

export function mockEnable(respondWith) {
  mockedResponse = respondWith;
  fs.readFile = mockedReadFile; // We're changing fs.readFile in default export.
}

export function mockDisable() {
  fs.readFile = originalReadFile;
}
