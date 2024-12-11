// Advent of Code day 9
// https://adventofcode.com/2024/day/9

import { rawInput } from "./rawInput";

// const testInput = `2333133121414131402`;

const blocks: (number | string)[] = [];
let index = 0;
for (let i = 0; i < rawInput.length; i++) {
  const char = Number(rawInput[i]);
  if (i % 2 === 0) {
    for (let j = 0; j < char; j++) {
      blocks.push(index);
    }
    index += 1;
  } else {
    for (let j = 0; j < char; j++) {
      blocks.push(".");
    }
  }
}

function calculateChecksum(blocks: (string | number)[]) {
  let checksum = 0;
  for (let i = 0; i < blocks.length; i++) {
    const value = blocks[i];
    if (typeof value === "string") continue;

    checksum += value * i;
  }
  return checksum;
}

function fillGaps() {
  const copy = [...blocks];
  let indexOfGap = copy.indexOf(".");
  let indexOfNumber = copy.findLastIndex((value) => typeof value === "number");
  while (indexOfGap < indexOfNumber) {
    const lastChar = copy[indexOfNumber];
    copy[indexOfGap] = lastChar;
    copy[indexOfNumber] = ".";
    indexOfGap = copy.indexOf(".");
    indexOfNumber = copy.findLastIndex((value) => typeof value === "number");
  }

  const partOne = calculateChecksum(copy);
  console.log({ partOne });
  document.getElementById("partOne")?.appendChild(document.createTextNode(partOne.toString()));
}

fillGaps();

function getLastBlock(blocks: (string | number)[], startIndex: number) {
  let lastIndex = 0;
  for (let i = startIndex; i >= 0; i--) {
    const block = blocks[i];
    if (typeof block === "number") {
      lastIndex = i;
      break;
    }
  }
  const fileId = blocks[lastIndex];
  let firstIndex = 0;
  for (let i = lastIndex - 1; i >= 0; i--) {
    const block = blocks[i];
    if (block !== fileId) {
      firstIndex = i + 1;
      return { firstIndex, lastIndex };
    }
  }
  throw new Error("did not find block");
}

function moveFiles() {
  const copy = [...blocks];
  let startIndex = copy.length - 1;
  let firstEmpty = 0;

  while (firstEmpty < startIndex) {
    const { firstIndex, lastIndex } = getLastBlock(copy, startIndex);
    firstEmpty = copy.findIndex((value) => value === ".");
    startIndex = firstIndex - 1;
    const length = lastIndex - firstIndex + 1;

    let count = 0;
    let moveIndex = -1;
    for (let i = 0; i < firstIndex; i++) {
      const block = copy[i];
      if (typeof block === "number") {
        count = 0;
      } else {
        count += 1;
        if (count === length) {
          moveIndex = i - length + 1;
          break;
        }
      }
    }

    if (moveIndex !== -1) {
      for (let i = 0; i < count; i++) {
        copy[moveIndex + i] = copy[firstIndex + i];
        copy[firstIndex + i] = ".";
      }
    }
  }

  const partTwo = calculateChecksum(copy);
  console.log({ partTwo });
  document.getElementById("partTwo")?.appendChild(document.createTextNode(partTwo.toString()));
}

moveFiles();

