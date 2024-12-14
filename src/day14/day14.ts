// Advent of Code day 14
// https://adventofcode.com/2024/day/14

import { rawInput } from "./rawInput";

const robots = rawInput
  .split("\n")
  .map((line) => line.split(" ").map((robot) => robot.slice(2).split(",").map(Number)));

const width = 101;
const height = 103;

const halfWidth = Math.floor(width / 2);
const halfHeight = Math.floor(height / 2);

function solve() {
  let partOne = 0;
  for (let secs = 0; secs < 10000; secs++) {
    const grid = new Set<string>();
    let isEasterEgg = true;
    const quads = [0, 0, 0, 0];

    robots.forEach(([pos, vel]) => {
      pos[0] = (pos[0] + vel[0]) % width;
      pos[1] = (pos[1] + vel[1]) % height;
      while (pos[0] < 0) pos[0] += width;
      while (pos[1] < 0) pos[1] += height;

      const newPos = `${pos[0]},${pos[1]}`;
      if (grid.has(newPos)) {
        // the easter egg has all the robots in unique positions
        isEasterEgg = false;
      } else {
        grid.add(newPos);
      }
    });

    if (secs === 99) {
      // part one answer
      robots.forEach(([pos]) => {
        if (pos[0] < halfWidth && pos[1] < halfHeight) quads[0] += 1;
        if (pos[0] > halfWidth && pos[1] < halfHeight) quads[1] += 1;
        if (pos[0] < halfWidth && pos[1] > halfHeight) quads[2] += 1;
        if (pos[0] > halfWidth && pos[1] > halfHeight) quads[3] += 1;
      });
      partOne = quads[0] * quads[1] * quads[2] * quads[3];
    }

    if (secs > 100 && isEasterEgg) {
      return { partOne, partTwo: secs + 1 };
    }
  }
  throw new Error("did not find easter egg");
}

const { partOne, partTwo } = solve();
console.log({ partOne });
console.log({ partTwo });

document.getElementById("partOne")?.appendChild(document.createTextNode(partOne.toString()));
document.getElementById("partTwo")?.appendChild(document.createTextNode(partTwo.toString()));

