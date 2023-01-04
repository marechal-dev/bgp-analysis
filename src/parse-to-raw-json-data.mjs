"use strict";

import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "node:url"

import formatISO from "date-fns/formatISO/index.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const scriptArgs = process.argv.slice(2);
const inputFilePath = scriptArgs[0].split("/");
const outputFileName = scriptArgs[1];

const file = fs.readFileSync(path.resolve(__dirname, "..", ...inputFilePath)).toString();

const lines = file.split('\n');

const filteredData = [];

for (const line of lines) {
  const [, prefix, asnsPath, , , , , , , timestamp, ,] = line.split('|');

  if (!timestamp) {
    continue;
  }

  const splittedPath = asnsPath.split(' ');

  const originalPathSize = splittedPath.length;

  const uniqueAsnsPathSize = [...new Set(splittedPath)].length

  const usesPrepend = uniqueAsnsPathSize < originalPathSize;

  filteredData.push({
    prefix,
    path: asnsPath,
    pathSize: originalPathSize,
    usesPrepend,
    date: formatISO(new Date(Number(timestamp) * 1000)),
  });
}

fs.writeFileSync(path.resolve(__dirname, "..", `./${outputFileName}.json`), JSON.stringify(filteredData))
