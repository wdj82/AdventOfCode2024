// Advent of Code day 10
// https://adventofcode.com/2024/day/10

import { getAdjacentCellsCardinal } from "../utils/getAdjacentCells";
import { rawInput } from "./rawInput";

// const testInput = `89010123
// 78121874
// 87430965
// 96549874
// 45678903
// 32019012
// 01329801
// 10456732`;

const grid = rawInput.split("\n").map((line) => line.split("").map(Number));
const height = grid.length;
const width = grid[0].length;

type Point = { x: number; y: number };

const trailHeads: Point[] = [];
for (let x = 0; x < height; x++) {
  for (let y = 0; y < width; y++) {
    const cell = grid[x][y];
    if (cell === 0) {
      trailHeads.push({ x, y });
    }
  }
}

const MAX_ELEVATION = 9;
const MAX_SLOPE = 1;

function findTrails() {
  let partOne = 0;
  let partTwo = 0;

  trailHeads.forEach((trailHead) => {
    const found = new Set();
    const stack = [trailHead];
    let count = 0;

    // depth first search
    while (stack.length > 0) {
      const current = stack.pop();
      if (!current) throw new Error("problem with stack");

      if (grid[current.x][current.y] === MAX_ELEVATION) {
        // part one wants how many destinations each trail head can reach - use set to avoid duplicates
        found.add(`${current.x},${current.y}`);
        // part two wants how many paths are to each destinations
        count += 1;
      } else {
        getAdjacentCellsCardinal(current.x, current.y, height, width).forEach(({ newX, newY }) => {
          // make sure next part of the trail is only one elevation higher
          if (grid[newX][newY] === grid[current.x][current.y] + MAX_SLOPE) {
            stack.push({ x: newX, y: newY });
          }
        });
      }
    }
    partOne += found.size;
    partTwo += count;
  });
  return { partOne, partTwo };
}

const { partOne, partTwo } = findTrails();
console.log({ partOne });
console.log({ partTwo });

document.getElementById("partOne")?.appendChild(document.createTextNode(partOne.toString()));
document.getElementById("partTwo")?.appendChild(document.createTextNode(partTwo.toString()));

