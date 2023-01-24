"use strict";

import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "node:url"

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const scriptArgs = process.argv.slice(2);
const inputFileName = scriptArgs[0];
const outputFileName = scriptArgs[1];

const file = fs.readFileSync(path.resolve(__dirname, "..", `./${inputFileName}`)).toString();
const data = [...JSON.parse(file)];

const prefixes = data.map((measurement) => measurement.prefix);
const uniquePrefixesList = [...new Set(prefixes)];
const hours = ["00", "02", "04", "06", "08", "10", "12", "14", "16", "18", "20", "22"];

const prependUsageData = {};

uniquePrefixesList.forEach((prefix) => prependUsageData[prefix] = {
  "2022-10-02T00:00:00-03:00": {
    usesPrepend: false,
    usesPrependFromOriginator: false,
  },
  "2022-10-02T02:00:00-03:00": {
    usesPrepend: false,
    usesPrependFromOriginator: false,
  },
  "2022-10-02T04:00:00-03:00": {
    usesPrepend: false,
    usesPrependFromOriginator: false,
  },
  "2022-10-02T06:00:00-03:00": {
    usesPrepend: false,
    usesPrependFromOriginator: false,
  },
  "2022-10-02T08:00:00-03:00": {
    usesPrepend: false,
    usesPrependFromOriginator: false,
  },
  "2022-10-02T10:00:00-03:00": {
    usesPrepend: false,
    usesPrependFromOriginator: false,
  },
  "2022-10-02T12:00:00-03:00": {
    usesPrepend: false,
    usesPrependFromOriginator: false,
  },
  "2022-10-02T14:00:00-03:00": {
    usesPrepend: false,
    usesPrependFromOriginator: false,
  },
  "2022-10-02T16:00:00-03:00": {
    usesPrepend: false,
    usesPrependFromOriginator: false,
  },
  "2022-10-02T18:00:00-03:00": {
    usesPrepend: false,
    usesPrependFromOriginator: false,
  },
  "2022-10-02T20:00:00-03:00": {
    usesPrepend: false,
    usesPrependFromOriginator: false,
  },
  "2022-10-02T22:00:00-03:00": {
    usesPrepend: false,
    usesPrependFromOriginator: false,
  },
});

for (const prefix of uniquePrefixesList) {
  const dataForCurrentPrefix = data.filter((evaluation) => evaluation.prefix === prefix);

  const measurementsHours = Object.keys(prependUsageData[prefix]);

  for (const hour of measurementsHours) {
    const dataForCurrentHourForCurrentPrefix = dataForCurrentPrefix.filter(
      (evaluation) => evaluation.prefix === prefix && evaluation.date === hour
    );

    if (dataForCurrentHourForCurrentPrefix.length === 0) {
      prependUsageData[prefix][hour] = null;
      continue;
    }

    const prefixDoUsePrepend = dataForCurrentHourForCurrentPrefix.some(
      (evaluation) => evaluation.usesPrepend
    );
    if (prefixDoUsePrepend) {
      prependUsageData[prefix][hour].usesPrepend = true;
    }

    const prefixDoUsePrependFromOriginator = dataForCurrentHourForCurrentPrefix.some(
      (evaluation) => evaluation.usesPrependFromOriginator
    );
    if (prefixDoUsePrependFromOriginator) {
      prependUsageData[prefix][hour].usesPrependFromOriginator = true;
    }
  }
}

fs.writeFileSync(path.resolve(__dirname, "..", `${outputFileName}_prepend_output.json`), JSON.stringify(prependUsageData));
