// Advent of Code day 22
// https://adventofcode.com/2024/day/22

import { rawInput } from "./rawInput";

const secretNumbers = rawInput.split("\n").map((line) => BigInt(line));

function randomNumber(seed: bigint) {
  seed = ((seed << 6n) ^ seed) % 16777216n;
  seed = ((seed >> 5n) ^ seed) % 16777216n;
  seed = ((seed << 11n) ^ seed) % 16777216n;

  return seed;
}

function solvePartOne() {
  let total = 0n;
  secretNumbers.forEach((num) => {
    let seed = num;
    for (let i = 0; i < 2000; i++) {
      seed = randomNumber(seed);
    }
    total += seed;
  });
  return total;
}
const partOne = solvePartOne();
console.log({ partOne });

function solvePartTwo() {
  const ranges: Record<string, number[]> = {};
  secretNumbers.forEach((num) => {
    let seed = num;
    const visited = new Set<string>();
    const changes: number[] = [];

    for (let i = 0; i < 2000; i++) {
      const nextSeed = randomNumber(seed);
      const currentPrice = Number(seed % 10n);
      const nextPrice = Number(nextSeed % 10n);
      changes.push(nextPrice - currentPrice);
      seed = nextSeed;

      if (changes.length === 4) {
        const key = changes.join(",");
        if (!visited.has(key)) {
          const savedRange = ranges[key] ?? [];
          savedRange.push(nextPrice);
          ranges[key] = savedRange;
          visited.add(key);
        }
        changes.shift();
      }
    }
  });

  return Math.max(...Object.values(ranges).map((range) => range.reduce((sum, num) => sum + num, 0)));
}
const partTwo = solvePartTwo();
console.log({ partTwo });
document.getElementById("partOne")?.appendChild(document.createTextNode(partOne.toString()));
document.getElementById("partTwo")?.appendChild(document.createTextNode(partTwo.toString()));

