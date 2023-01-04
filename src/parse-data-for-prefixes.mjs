"use strict";

import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "node:url"

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const scriptArgs = process.argv.slice(2);
const inputFileName = scriptArgs[0];
const outputFileName = scriptArgs[1];

const file = fs.readFileSync(path.resolve(__dirname, '..', `./${inputFileName}.json`), {
  encoding: "utf-8",
}).toString();

const data = JSON.parse(file);

const uniquePrefixes = [...new Set(data.map((measurement) => measurement.prefix))];

const dataPerPrefix = {};

uniquePrefixes.forEach((prefix) => {
  const dataForCurrentPrefix = data.filter((measurement) => measurement.prefix === prefix);

  dataPerPrefix[prefix] = {
    path: [],
    pathSize: [],
    usesPrepend: [],
    date: [],
  };

  dataForCurrentPrefix.forEach((data) => {
    dataPerPrefix[prefix].path.push(data.path);
    dataPerPrefix[prefix].pathSize.push(data.pathSize);
    dataPerPrefix[prefix].usesPrepend.push(data.usesPrepend);
    dataPerPrefix[prefix].date.push(data.date);
  });

  const [address, bits] = prefix.split("/");

  fs.writeFileSync(path.resolve(__dirname, `./${address}_${bits}_${outputFileName}.json`), JSON.stringify(dataPerPrefix[prefix]));
});
