// Advent of Code day 16
// https://adventofcode.com/2024/day/16

import { PriorityQueue } from "../utils/priorityQueue";
import { rawInput } from "./rawInput";

// const testInput = `###############
// #.......#....E#
// #.#.###.#.###.#
// #.....#.#...#.#
// #.###.#####.#.#
// #.#.#.......#.#
// #.#.#####.###.#
// #...........#.#
// ###.#.#####.#.#
// #...#.....#.#.#
// #.#.#.###.#.#.#
// #.....#...#.#.#
// #.###.#.#.#.#.#
// #S..#.....#...#
// ###############`;

const grid = rawInput.split("\n").map((line) => line.split(""));
const height = grid.length;
const width = grid[0].length;

const searchDirectionsCardinal: { dx: number; dy: number; direction: Directions }[] = [
  { dx: 0, dy: -1, direction: "W" },
  { dx: 0, dy: 1, direction: "E" },
  { dx: -1, dy: 0, direction: "N" },
  { dx: 1, dy: 0, direction: "S" },
];

type Directions = "N" | "S" | "E" | "W";
const directionCosts: Record<Directions, Record<Directions, number>> = {
  N: { E: 1001, N: 1, W: 1001, S: -1 },
  S: { E: 1001, N: -1, W: 1001, S: 1 },
  W: { E: -1, N: 1001, W: 1, S: 1001 },
  E: { E: 1, N: 1001, W: -1, S: 1001 },
};

function getAdjacentCells(currX: number, currY: number, direction: Directions) {
  const result = [];

  for (let i = 0; i < searchDirectionsCardinal.length; i++) {
    const newX = searchDirectionsCardinal[i].dx + currX;
    const newY = searchDirectionsCardinal[i].dy + currY;
    const newDirection = searchDirectionsCardinal[i].direction;
    const newCost = directionCosts[direction][newDirection];
    if (grid[newX][newY] !== "#" && newCost !== -1) {
      result.push({ newX, newY, newCost, newDirection });
    }
  }
  return result;
}

const start = { x: 0, y: 0 };
const end = { x: 0, y: 0 };
for (let x = 0; x < height; x++) {
  for (let y = 0; y < width; y++) {
    if (grid[x][y] === "S") {
      start.x = x;
      start.y = y;
    } else if (grid[x][y] === "E") {
      end.x = x;
      end.y = y;
    }
  }
}

// standard dijkstra's
function findLowestScore() {
  const nodes = new PriorityQueue<{ x: number; y: number; direction: Directions }>();
  nodes.enqueue({ x: start.x, y: start.y, direction: "E" }, 0);
  const visited = new Set();

  while (!nodes.isEmpty()) {
    const node = nodes.dequeue();
    const cost = node.priority;
    const { x, y, direction } = node.value;

    if (x === end.x && y === end.y) {
      return cost;
    }

    const key = `${x},${y},${direction}`;
    if (visited.has(key)) {
      continue;
    }
    visited.add(key);

    getAdjacentCells(x, y, direction).forEach(({ newX, newY, newCost, newDirection }) => {
      nodes.enqueue({ x: newX, y: newY, direction: newDirection }, cost + newCost);
    });
  }

  throw new Error("did not find end");
}

const partOne = findLowestScore();
console.log({ partOne });

function findBestSeat(lowestScore: number) {
  const nodes = new PriorityQueue<{ x: number; y: number; direction: Directions; history: Set<string> }>();
  nodes.enqueue({ x: start.x, y: start.y, direction: "E", history: new Set([`${start.x},${start.y}`]) }, 0);
  const visited = new Map();
  // save all tiles that are part of at least one path through the maze
  const allTiles = new Set();

  while (!nodes.isEmpty()) {
    const node = nodes.dequeue();
    const cost = node.priority;
    const { x, y, direction, history } = node.value;

    if (cost > lowestScore) {
      // finding routes that cost too much - stop
      break;
    }

    if (x === end.x && y === end.y) {
      history.forEach((path) => allTiles.add(path));
      continue;
    }

    const key = `${x},${y},${direction}`;
    if (visited.has(key) && visited.get(key) < cost) {
      continue;
    }
    visited.set(key, cost);

    getAdjacentCells(x, y, direction).forEach(({ newX, newY, newCost, newDirection }) => {
      const newKey = `${newX},${newY}`;
      if (!history.has(newKey)) {
        const newHistory = new Set([...history, newKey]);
        nodes.enqueue({ x: newX, y: newY, direction: newDirection, history: newHistory }, cost + newCost);
      }
    });
  }

  return allTiles.size;
}

// use part one for finding all paths of that cost
const partTwo = findBestSeat(partOne);
console.log({ partTwo });

document.getElementById("partOne")?.appendChild(document.createTextNode(partOne.toString()));
document.getElementById("partTwo")?.appendChild(document.createTextNode(partTwo.toString()));
