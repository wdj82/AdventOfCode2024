// Advent of Code day 11
// https://adventofcode.com/2024/day/11

import { rawInput } from "./rawInput";

// const testInput = `125 17`;

const stones = rawInput.split(" ");

const map = new Map<string, number>();

// recursively work through each stone - memoizing as we go
function blink(stone: string, blinks: number) {
  const key = `${stone}+${blinks}`;
  if (map.has(key)) {
    return map.get(key) ?? 1;
  }

  // no more blinks return this single stone
  if (blinks === 0) {
    map.set(key, 1);
    return 1;
  }

  blinks -= 1;
  let total = 0;

  if (stone === "0") {
    total += blink("1", blinks);
  } else if (stone.length % 2 === 0) {
    const firstHalf = stone.slice(0, stone.length / 2);
    const secondHalf = stone.slice(stone.length / 2);
    total += blink(firstHalf, blinks);
    // get rid of leading zeroes
    total += blink(Number(secondHalf).toString(), blinks);
  } else {
    const newStone = Number(stone) * 2024;
    total += blink(newStone.toString(), blinks);
  }

  map.set(key, total);
  return total;
}

let partOne = 0;
stones.forEach((stone) => {
  partOne += blink(stone, 25);
});
console.log({ partOne });

let partTwo = 0;
stones.forEach((stone) => {
  partTwo += blink(stone, 75);
});
console.log({ partTwo });

document.getElementById("partOne")?.appendChild(document.createTextNode(partOne.toString()));
document.getElementById("partTwo")?.appendChild(document.createTextNode(partTwo.toString()));
