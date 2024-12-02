// Advent of Code day 2
// https://adventofcode.com/2024/day/2

import { rawInput } from "./rawInput";

const reports = rawInput.split("\n").map((line) => line.split(" ").map(Number));

function checkReportIsValid(report: number[]) {
  if (report[0] === report[1]) {
    return { isSafe: false, index: 0 };
  }

  let test = 0;
  for (let i = 0; i < report.length - 1; i++) {
    if (report[i] === report[i + 1]) {
      return { isSafe: false, index: i };
    }

    if (report[i] < report[i + 1]) {
      test += 1;
    } else {
      test -= 1;
    }
  }

  const isIncreasing = test > 0;

  for (let i = 0; i < report.length - 1; i++) {
    const level = report[i];
    const nextLevel = report[i + 1];

    if (isIncreasing && level > nextLevel) {
      return { isSafe: false, index: i };
    }
    if (!isIncreasing && level < nextLevel) {
      return { isSafe: false, index: i };
    }

    const diff = Math.abs(level - nextLevel);
    if (diff < 1 || diff > 3) {
      return { isSafe: false, index: i };
    }
  }
  return { isSafe: true, index: 0 };
}

function checkReport(report: number[], isPartOne: boolean) {
  let { isSafe, index } = checkReportIsValid(report);
  if (isSafe) {
    return true;
  }

  if (isPartOne) {
    return false;
  }

  // check after removing number at the index
  let skippedReport = report.filter((_, i) => index !== i);
  ({ isSafe } = checkReportIsValid(skippedReport));
  if (isSafe) {
    return true;
  }
  // check after removing the number at the next index
  skippedReport = report.filter((_, i) => index + 1 !== i);
  ({ isSafe } = checkReportIsValid(skippedReport));
  return isSafe;
}

let partOne = 0;
let partTwo = 0;
reports.forEach((report) => {
  let isSafe = checkReport(report, true);
  if (isSafe) {
    partOne += 1;
  }
  isSafe = checkReport(report, false);
  if (isSafe) {
    partTwo += 1;
  }
});

console.log({ partOne });
console.log({ partTwo });

document.getElementById("partOne")?.appendChild(document.createTextNode(partOne.toString()));
document.getElementById("partTwo")?.appendChild(document.createTextNode(partTwo.toString()));
