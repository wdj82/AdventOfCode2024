// Advent of Code day 6
// https://adventofcode.com/2024/day/6

import { rawInput } from "./rawInput";

// const testInput = `....#.....
// .........#
// ..........
// ..#.......
// .......#..
// ..........
// .#..^.....
// ........#.
// #.........
// ......#...`;

const grid = rawInput.split("\n").map((lines) => lines.split(""));
const height = grid.length;
const width = grid[0].length;

function findStart() {
  for (let x = 0; x < height; x++) {
    for (let y = 0; y < width; y++) {
      if (grid[x][y] === "^") {
        return { x, y };
      }
    }
  }
  throw new Error("could not find starting position");
}

const start = findStart();

const directions = [
  { dx: -1, dy: 0 },
  { dx: 0, dy: 1 },
  { dx: 1, dy: 0 },
  { dx: 0, dy: -1 },
];

function isInBounds(x: number, y: number) {
  return x >= 0 && x < width && y >= 0 && y < height;
}

const positions = new Set<string>();
function findPositions() {
  let currX = start.x;
  let currY = start.y;
  let currDir = 0;

  while (isInBounds(currX, currY)) {
    positions.add(`${currX},${currY}`);

    const nextX = currX + directions[currDir].dx;
    const nextY = currY + directions[currDir].dy;
    if (!isInBounds(nextX, nextY)) {
      return positions;
    }

    if (grid[nextX][nextY] === "#") {
      currDir = currDir === 3 ? 0 : currDir + 1;
    } else {
      currX += directions[currDir].dx;
      currY += directions[currDir].dy;
    }
  }
  return positions;
}

findPositions();
const partOne = positions.size;
console.log({ partOne });

function isLoop() {
  let currX = start.x;
  let currY = start.y;
  let currDir = 0;
  const visited = new Set<string>();

  while (isInBounds(currX, currY)) {
    const position = `${currDir},${currX},${currY}`;
    // have been here going the same direction = we're in a loop
    if (visited.has(position)) {
      return true;
    }
    visited.add(position);

    const nextX = currX + directions[currDir].dx;
    const nextY = currY + directions[currDir].dy;

    if (!isInBounds(nextX, nextY)) {
      return false;
    }

    if (grid[nextX][nextY] === "#") {
      currDir = currDir === 3 ? 0 : currDir + 1;
    } else {
      currX += directions[currDir].dx;
      currY += directions[currDir].dy;
    }
  }
  return false;
}

// remove starting position for finding loops
positions.delete(`${start.x},${start.y}`);

let partTwo = 0;
positions.forEach((position) => {
  const [x, y] = position.split(",").map(Number);

  // add and remove obstacles along guard's path to find loops
  grid[x][y] = "#";
  if (isLoop()) {
    partTwo += 1;
  }
  grid[x][y] = ".";
});

console.log({ partTwo });

document.getElementById("partOne")?.appendChild(document.createTextNode(partOne.toString()));
document.getElementById("partTwo")?.appendChild(document.createTextNode(partTwo.toString()));
