// Advent of Code day 20
// https://adventofcode.com/2024/day/20

import { rawInput } from "./rawInput";

const searchDirectionsCardinal = [
  { dx: 0, dy: -1 },
  { dx: 0, dy: 1 },
  { dx: -1, dy: 0 },
  { dx: 1, dy: 0 },
];

function getAdjacentCells(currX: number, currY: number) {
  const result = [];
  for (let i = 0; i < searchDirectionsCardinal.length; i++) {
    const newX = searchDirectionsCardinal[i].dx + currX;
    const newY = searchDirectionsCardinal[i].dy + currY;
    if (grid[newX][newY] !== "#") {
      result.push({ newX, newY });
    }
  }
  return result;
}

const grid = rawInput.split("\n").map((line) => line.split(""));
const height = grid.length;
const width = grid[0].length;

function findEnd() {
  for (let x = 0; x < height; x++) {
    for (let y = 0; y < width; y++) {
      if (grid[x][y] === "E") {
        return { x, y };
      }
    }
  }
  throw new Error("did not find end");
}
const end = findEnd();

function bfs(start: { x: number; y: number }) {
  const distances = new Map<string, number>();
  distances.set(`${start.x},${start.y}`, 0);
  const queue = [{ ...start, distance: 0 }];

  while (queue.length > 0) {
    const current = queue.shift();
    if (!current) break;
    const { x, y, distance } = current;

    getAdjacentCells(x, y).forEach(({ newX, newY }) => {
      const newDistance = distance + 1;
      const key = `${newX},${newY}`;
      const savedDistance = distances.get(key);
      if (savedDistance === undefined || savedDistance > newDistance) {
        queue.push({ x: newX, y: newY, distance: newDistance });
        distances.set(key, newDistance);
      }
    });
  }
  return distances;
}

function findCheats() {
  const paths = bfs(end);
  const keys = [...paths.keys()];

  let partOne = 0;
  let partTwo = 0;
  for (let i = 0; i < keys.length; i++) {
    for (let j = 0; j < keys.length; j++) {
      if (i === j) continue;

      const start = keys[i].split(",").map(Number);
      const end = keys[j].split(",").map(Number);

      const dist = Math.abs(start[0] - end[0]) + Math.abs(start[1] - end[1]);

      const a = paths.get(keys[i]) ?? 0;
      const b = paths.get(keys[j]) ?? 0;

      if (dist <= 2 && a - b - dist >= 100) {
        partOne += 1;
      }
      if (dist <= 20 && a - b - dist >= 100) {
        partTwo += 1;
      }
    }
  }
  return { partOne, partTwo };
}

const { partOne, partTwo } = findCheats();
console.log({ partOne });
console.log({ partTwo });

document.getElementById("partOne")?.appendChild(document.createTextNode(partOne.toString()));
document.getElementById("partTwo")?.appendChild(document.createTextNode(partTwo.toString()));
