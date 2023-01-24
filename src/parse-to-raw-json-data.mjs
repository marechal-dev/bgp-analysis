"use strict";

import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "node:url"

import formatISO from "date-fns/formatISO/index.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const scriptArgs = process.argv.slice(2);
const inputDirsPath = scriptArgs[0];
const outputFileName = scriptArgs[1];

const dirs = fs.readdirSync(path.resolve(__dirname, "..", inputDirsPath));

for (const dir of dirs) {
  if (dir === "week") {
    continue;
  }

  const files = fs.readdirSync(path.resolve(__dirname, "..", inputDirsPath, dir));

  const filteredData = [];

  for (const file of files) {
    const currentFilePath = path.resolve(__dirname, "..", inputDirsPath, dir, file);
    const currentFileBasename = path.basename(currentFilePath);
    const currentFile = fs.readFileSync(currentFilePath).toString();

    const [, hours] = currentFileBasename.split(".");
    const parsedHours = Number(hours.substring(0, 2));
    const timestamp = formatISO(new Date(2022, 10 - 1, 2, parsedHours, 0, 0));
    // const timestamp = `2022-10-02 ${String(parsedHours).padStart(2, "0")}:00:00`;

    const lines = currentFile.split('\n');

    if (lines.length === 0) {
      continue;
    }

    for (const line of lines) {
      if (!line) {
        continue;
      }

      const [, prefix, asnsPath] = line.split('|');

      const splittedPath = asnsPath.split(' ');

      const originalPathSize = splittedPath.length;

      const uniqueAsnsPathSize = [...new Set(splittedPath)].length

      const usesPrepend = uniqueAsnsPathSize < originalPathSize;
      const usesPrependFromOriginator = splittedPath[splittedPath.length - 1] === splittedPath[splittedPath.length - 2]

      filteredData.push({
        prefix,
        path: asnsPath,
        pathSize: originalPathSize,
        usesPrepend,
        usesPrependFromOriginator,
        date: timestamp,
      });
    }
  }

  fs.writeFileSync(path.resolve(__dirname, "..", `./${dir}_${outputFileName}.json`), JSON.stringify(filteredData))

  filteredData.splice(0);
}


