// Advent of Code day 18
// https://adventofcode.com/2024/day/18

import { getAdjacentCellsCardinal } from "../utils/getAdjacentCells";
import { PriorityQueue } from "../utils/priorityQueue";
import { rawInput } from "./rawInput";

const positions = rawInput.split("\n").map((line) => line.split(",").map(Number));

const gridSize = 71;
// const grid = new Array(gridSize).fill(".").map(() => new Array(gridSize).fill("."));

// set up grid
const steps = 1024;
// for (let i = 0; i < steps; i++) {
//   const [y, x] = positions[i];
//   grid[x][y] = "#";
// }

// standard dijkstra's
function findShortestPath(steps: number) {
  const grid = new Array(gridSize).fill(".").map(() => new Array(gridSize).fill("."));
  for (let i = 0; i < steps; i++) {
    const [y, x] = positions[i];
    grid[x][y] = "#";
  }
  const nodes = new PriorityQueue<{ x: number; y: number }>();
  nodes.enqueue({ x: 0, y: 0 }, 0);
  const visited = new Set();

  while (!nodes.isEmpty()) {
    const node = nodes.dequeue();
    const { x, y } = node.value;
    const distance = node.priority;

    if (x === gridSize - 1 && y === gridSize - 1) {
      return distance;
    }

    const key = `${x},${y}`;
    if (visited.has(key)) {
      continue;
    }
    visited.add(key);

    getAdjacentCellsCardinal(x, y, gridSize, gridSize).forEach(({ newX, newY }) => {
      if (grid[newX][newY] !== "#") {
        nodes.enqueue({ x: newX, y: newY }, distance + 1);
      }
    });
  }
  return false;
}

const partOne = findShortestPath(steps);
console.log({ partOne });

// keep adding obstacles until we can no longer reach end of the grid
// binary search the positions
function solvePartTwo() {
  let low = steps;
  let high = positions.length;
  while (high - low > 1) {
    let i = Math.floor((low + high) / 2);
    const result = findShortestPath(i);
    if (result) {
      low = i;
    } else {
      high = i;
    }
  }
  const [y, x] = positions[low];
  return `${y},${x}`;
}

const partTwo = solvePartTwo();
console.log({ partTwo });

document.getElementById("partOne")?.appendChild(document.createTextNode(partOne.toString()));
document.getElementById("partTwo")?.appendChild(document.createTextNode(partTwo.toString()));
