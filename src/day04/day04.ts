// Advent of Code day 4
// https://adventofcode.com/2024/day/4

import { rawInput } from "./rawInput";

// const testInput = `MMMSXXMASM
// MSAMXMSMSA
// AMXSXMAAMM
// MSAMASMSMX
// XMASAMXAMM
// XXAMMXXAMA
// SMSMSASXSS
// SAXAMASAAA
// MAMMMXMMMM
// MXMXAXMASX`;

const grid = rawInput.split("\n").map((line) => line.split(""));
console.log({ grid });

const height = grid.length;
const width = grid[0].length;

const XMAS = ["M", "A", "S"];

const searchDirectionsOrdinal = [
  { dx: 0, dy: -1 },
  { dx: 0, dy: 1 },
  { dx: -1, dy: 0 },
  { dx: 1, dy: 0 },
  { dx: -1, dy: 1 },
  { dx: 1, dy: 1 },
  { dx: 1, dy: -1 },
  { dx: -1, dy: -1 },
];

function checkForXMAS(x: number, y: number, dx: number, dy: number) {
  let index = 0;
  x += dx;
  y += dy;
  while (x >= 0 && x < height && y >= 0 && y < width && index < 4) {
    const cell = grid[x][y];
    if (cell !== XMAS[index]) {
      break;
    }
    index += 1;
    x += dx;
    y += dy;
  }

  return index === 3;
}

let partOne = 0;
for (let i = 0; i < height; i++) {
  for (let j = 0; j < width; j++) {
    const cell = grid[i][j];
    if (cell === "X") {
      searchDirectionsOrdinal.forEach(({ dx, dy }) => {
        if (checkForXMAS(i, j, dx, dy)) {
          partOne += 1;
        }
      });
    }
  }
}
console.log({ partOne });

function checkForMAS(first: string, second: string) {
  if (first === "M" && second === "S") return true;
  if (first === "S" && second === "M") return true;
  return false;
}

let partTwo = 0;
for (let x = 0; x < height; x++) {
  for (let y = 0; y < width; y++) {
    const cell = grid[x][y];
    if (cell === "A") {
      if (x === 0 || x === height - 1 || y === 0 || y === width - 1) {
        continue;
      }

      // check upper left and lower right
      const upperLeft = grid[x - 1][y - 1];
      const lowerRight = grid[x + 1][y + 1];
      if (!checkForMAS(upperLeft, lowerRight)) {
        continue;
      }
      // check lower left and upper right
      const lowerLeft = grid[x + 1][y - 1];
      const upperRight = grid[x - 1][y + 1];
      if (!checkForMAS(lowerLeft, upperRight)) {
        continue;
      }
      partTwo += 1;
    }
  }
}
console.log({ partTwo });

document.getElementById("partOne")?.appendChild(document.createTextNode(partOne.toString()));
document.getElementById("partTwo")?.appendChild(document.createTextNode(partTwo.toString()));
