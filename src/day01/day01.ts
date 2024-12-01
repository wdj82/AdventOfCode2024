// Advent of Code day 1
// https://adventofcode.com/2024/day/1

import { rawInput } from "./rawInput";

// const testInput = `3   4
// 4   3
// 2   5
// 1   3
// 3   9
// 3   3`;

const left: number[] = [];
const right: number[] = [];
const lines = rawInput.split("\n").map((line) => line.split("   "));
lines.forEach((line) => {
  left.push(Number(line[0]));
  right.push(Number(line[1]));
});

const sortedLeft = left.toSorted((a, b) => a - b);
const sortedRight = right.toSorted((a, b) => a - b);

const partOne = sortedLeft.reduce((acc, curr, index) => acc + Math.abs(curr - sortedRight[index]), 0);
console.log({ partOne });

const score = new Map<number, number>();
let partTwo = 0;
left.forEach((leftNumber) => {
  let count = score.get(leftNumber) ?? -1;
  if (count === -1) {
    count = 0;
    count = right.reduce((acc, rightNumber) => {
      if (leftNumber === rightNumber) {
        return acc + 1;
      }
      return acc;
    }, 0);
    score.set(leftNumber, count);
  }
  partTwo += count * leftNumber;
});
console.log({ partTwo });

document.getElementById("partOne")?.appendChild(document.createTextNode(partOne.toString()));
document.getElementById("partTwo")?.appendChild(document.createTextNode(partTwo.toString()));

