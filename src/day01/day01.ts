// Advent of Code day 1
// https://adventofcode.com/2024/day/1

import { rawInput } from "./rawInput";

// const testInput = `3   4
// 4   3
// 2   5
// 1   3
// 3   9
// 3   3`;

const leftList: number[] = [];
const rightList: number[] = [];
const lines = rawInput.split("\n").map((line) => line.split("   "));
lines.forEach((line) => {
  leftList.push(Number(line[0]));
  rightList.push(Number(line[1]));
});

const sortedLeft = leftList.toSorted((a, b) => a - b);
const sortedRight = rightList.toSorted((a, b) => a - b);

const partOne = sortedLeft.reduce((acc, curr, index) => acc + Math.abs(curr - sortedRight[index]), 0);
console.log({ partOne });

const score = new Map<number, number>();
rightList.forEach((number) => {
  const count = score.get(number) ?? 0;
  score.set(number, count + 1);
});

const partTwo = leftList.reduce((acc, leftNumber) => {
  const count = score.get(leftNumber) ?? 0;
  return count * leftNumber + acc;
}, 0);
console.log({ partTwo });

document.getElementById("partOne")?.appendChild(document.createTextNode(partOne.toString()));
document.getElementById("partTwo")?.appendChild(document.createTextNode(partTwo.toString()));
