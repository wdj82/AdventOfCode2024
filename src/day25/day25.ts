// Advent of Code day 25
// https://adventofcode.com/2024/day/25

import { rawInput } from "./rawInput";

const keysAndLocks = rawInput.split("\n\n").map((blocks) => blocks.split("\n").map((lines) => lines.split("")));

const keys: number[][] = [];
const locks: number[][] = [];

// sort into keys and locks and find column heights
keysAndLocks.forEach((block) => {
  let isLock = true;
  for (let i = 0; i < block[0].length; i++) {
    if (block[0][i] === ".") {
      isLock = false;
      break;
    }
  }

  const columns: number[] = [];
  for (let y = 0; y < block[0].length; y++) {
    for (let x = 0; x < block.length; x++) {
      if (isLock && block[x][y] === ".") {
        columns.push(x - 1);
        break;
      }
      if (!isLock && block[x][y] === "#") {
        columns.push(block.length - x - 1);
        break;
      }
    }
  }
  isLock ? locks.push(columns) : keys.push(columns);
});

const maxSpace = keysAndLocks[0].length - 1;

let partOne = 0;
keys.forEach((key) => {
  locks.forEach((lock) => {
    for (let i = 0; i < key.length; i++) {
      if (key[i] + lock[i] >= maxSpace) {
        // have overlap - go to next lock
        return;
      }
    }
    // key and lock fit together
    partOne += 1;
  });
});

console.log({ partOne });
document.getElementById("partOne")?.appendChild(document.createTextNode(partOne.toString()));

