// Advent of Code day 12
// https://adventofcode.com/2024/day/12

import { searchDirectionsCardinal } from "../utils/getAdjacentCells";
import { rawInput } from "./rawInput";

// const testInput = `RRRRIICCFF
// RRRRIICCCF
// VVRRRCCFFF
// VVRCCCJFFF
// VVVVCJJCFE
// VVIVCCJJEE
// VVIIICJJEE
// MIIIIIJJEE
// MIIISIJEEE
// MMMISSJEEE`;

const grid = rawInput.split("\n").map((line) => line.split(""));
const height = grid.length;
const width = grid[0].length;

function findCost() {
  const seen = new Set();
  let price = 0;

  for (let x = 0; x < height; x++) {
    for (let y = 0; y < width; y++) {
      const currentType = grid[x][y];
      let regionSize = 0;
      let perimeter = 0;

      const queue = [{ x, y }];
      while (queue.length) {
        const { x, y } = queue.pop() ?? { x: 0, y: 0 };
        const key = `${x},${y}`;
        if (seen.has(key)) {
          continue;
        }

        seen.add(key);
        regionSize += 1;

        getAdjacentCells(x, y).forEach(({ newX, newY }) => {
          if (!isInBounds(newX, newY) || grid[newX][newY] !== currentType) {
            // add fence for neighbor of other type or border of grid
            perimeter += 1;
          } else {
            queue.push({ x: newX, y: newY });
          }
        });
      }

      if (regionSize > 0 && perimeter > 0) {
        price += regionSize * perimeter;
      }
    }
  }

  return price;
}

const partOne = findCost();
console.log({ partOne });

function findDiscountCost() {
  const seen = new Set<string>();
  let price = 0;

  for (let x = 0; x < height; x++) {
    for (let y = 0; y < width; y++) {
      const currentType = grid[x][y];
      let regionSize = 0;
      let perimeter = 0;
      const edges = new Set<string>();

      const queue = [{ x, y }];
      while (queue.length) {
        const { x, y } = queue.pop() ?? { x: 0, y: 0 };
        const key = `${x},${y}`;
        if (seen.has(key)) {
          continue;
        }

        seen.add(key);
        regionSize += 1;

        getAdjacentCells(x, y).forEach(({ newX, newY }, index) => {
          if (!isInBounds(newX, newY) || grid[newX][newY] !== currentType) {
            perimeter += 1;

            edges.add(`${index},${newX},${newY}`);

            // check if we already counted this edge and order from neighbors
            getAdjacentCells(newX, newY).forEach(({ newX: newNewX, newY: newNewY }) => {
              if (edges.has(`${index},${newNewX},${newNewY}`)) {
                perimeter -= 1;
              }
            });
          } else {
            queue.push({ x: newX, y: newY });
          }
        });
      }

      if (regionSize > 0 && perimeter > 0) {
        price += regionSize * perimeter;
      }
    }
  }

  return price;
}

const partTwo = findDiscountCost();
console.log({ partTwo });

document.getElementById("partOne")?.appendChild(document.createTextNode(partOne.toString()));
document.getElementById("partTwo")?.appendChild(document.createTextNode(partTwo.toString()));

function getAdjacentCells(currX: number, currY: number) {
  const result = [];

  for (let i = 0; i < searchDirectionsCardinal.length; i++) {
    const newX = searchDirectionsCardinal[i].dx + currX;
    const newY = searchDirectionsCardinal[i].dy + currY;

    result.push({ newX, newY });
  }
  return result;
}

function isInBounds(x: number, y: number) {
  return x >= 0 && x < height && y >= 0 && y < width;
}
