// Advent of Code day 2
// https://adventofcode.com/2024/day/2

import { rawInput } from "./rawInput";

const testInput = `7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9`;

const testInput2 = `48 46 47 49 51 54 56
1 1 2 3 4 5
1 2 3 4 5 5
5 1 2 3 4 5
1 4 3 2 1
1 6 7 8 9
1 2 3 4 3
9 8 7 6 7`;

const reports = testInput.split("\n").map((line) => line.split(" ").map(Number));
// console.log({ reports });

function checkReport(report: number[], useDampener = false) {
  console.log(report);
  let skips = useDampener ? 1 : 0;
  let isIncreasing = report[0] < report[1];
  console.log({ isIncreasing });
  for (let i = 0; i < report.length - 1; i++) {
    const level = report[i];
    const nextLevel = report[i + 1];
    console.log({ level, nextLevel });
    if (isIncreasing && level > nextLevel) {
      console.log("not increasing");
      skips -= 1;
      if (skips < 0) {
        return false;
      } else {
        report.splice(i, 1);
        i -= 1;
      }
    }
    if (!isIncreasing && level < nextLevel) {
      console.log("not decreasing");
      skips -= 1;
      if (skips < 0) {
        return false;
      } else {
        report.splice(i, 1);
        i -= 1;
      }
    }
    const diff = Math.abs(level - nextLevel);
    if (diff < 1 || diff > 3) {
      console.log(`${diff} too big`);
      skips -= 1;
      if (skips < 0) {
        return false;
      } else {
        report.splice(i, 1);
        console.log({ report });
        i -= 1;
      }
    }
  }
  return true;
}

let partOne = 0;
let partTwo = 0;
for (let i = 0; i < reports.length; i++) {
  const report = reports[i];
  // let isSafe = checkReport(report);
  // if (isSafe) {
  //   partOne += 1;
  // }

  const isSafe = checkReport(report, true);
  console.log({ isSafe });
  if (isSafe) {
    partTwo += 1;
  }
}
console.log({ partOne });
console.log({ partTwo });

// document.getElementById("partOne")?.appendChild(document.createTextNode(partOne.toString()));
// document.getElementById("partTwo")?.appendChild(document.createTextNode(partTwo.toString()));
