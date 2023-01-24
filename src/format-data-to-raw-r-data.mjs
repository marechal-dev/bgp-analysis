"use strict";

import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "node:url"

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const scriptArgs = process.argv.slice(2);
const inputFileName = scriptArgs[0];
const outputFileName = scriptArgs[1];
const option = scriptArgs[2];

const file = fs.readFileSync(path.resolve(__dirname, "..", `./${inputFileName}`)).toString();

const data = JSON.parse(file);

const finalData = {
  prefix: [],
  path: [],
  pathSize: [],
  usesPrepend: [],
  usesPrependFromOriginator: [],
  date: [],
};

data.forEach((data) => {
  finalData.prefix.push(data.prefix);
  finalData.path.push(data.path);
  finalData.pathSize.push(data.pathSize);
  finalData.usesPrepend.push(data.usesPrepend);
  finalData.usesPrependFromOriginator.push(data.usesPrependFromOriginator);
  finalData.date.push(data.date);
});

fs.writeFileSync(path.resolve(__dirname, "..", "filtered-data", `${option}-data`, `./${outputFileName}_output.json`), JSON.stringify(finalData));
