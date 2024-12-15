// Advent of Code day 15
// https://adventofcode.com/2024/day/15

import { rawInput } from "./rawInput";

const directions = { "<": { dx: 0, dy: -1 }, "^": { dx: -1, dy: 0 }, ">": { dx: 0, dy: 1 }, v: { dx: 1, dy: 0 } };
type Moves = keyof typeof directions;

const [rawGrid, rawMoves] = rawInput.split("\n\n");

const ogGrid = rawGrid.split("\n").map((line) => line.split(""));
const moves = rawMoves.split("\n").flatMap((line) => line.split("")) as Moves[];

function findBot(grid: string[][]) {
  for (let x = 0; x < grid.length; x++) {
    for (let y = 0; y < grid[0].length; y++) {
      if (grid[x][y] === "@") {
        return { x, y };
      }
    }
  }
  throw new Error("did not find bot");
}

const EMPTY_SPACE = ".";
const BOX = "O";
const WALL = "#";

function solvePartOne() {
  const grid = ogGrid.map((row) => [...row]);
  const bot = findBot(grid);

  moves.forEach((move) => {
    const { dx, dy } = directions[move];
    const newX = bot.x + dx;
    const newY = bot.y + dy;

    if (grid[newX][newY] === EMPTY_SPACE) {
      grid[bot.x][bot.y] = EMPTY_SPACE;
      // gridCopy[newX][newY] = "@";
      bot.x = newX;
      bot.y = newY;
      return;
    }

    if (grid[newX][newY] === WALL) {
      return;
    }

    // find last box
    let x = newX + dx;
    let y = newY + dy;
    while (grid[x][y] === BOX) {
      x += dx;
      y += dy;
    }

    if (grid[x][y] === WALL) {
      // cannot move boxes into wall
      return;
    }

    // move the first box to the last position and the bot into the now empty space
    grid[x][y] = BOX;

    grid[bot.x][bot.y] = EMPTY_SPACE;
    bot.x = newX;
    bot.y = newY;
    // gridCopy[newX][newY] = "@";
  });

  return calculateGPS(grid);
}
const partOne = solvePartOne();
console.log({ partOne });

function solvePartTwo() {
  let bigGrid = embiggenGrid();
  const bot = findBot(bigGrid);

  moves.forEach((move) => {
    const { dx, dy } = directions[move];
    const newX = bot.x + dx;
    const newY = bot.y + dy;

    if (bigGrid[newX][newY] === EMPTY_SPACE) {
      bigGrid[bot.x][bot.y] = EMPTY_SPACE;
      // bigGrid[newX][newY] = "@";
      bot.x = newX;
      bot.y = newY;
      return;
    }

    if (bigGrid[newX][newY] === WALL) {
      return;
    }

    // find all boxes that would be moved checking both left and right areas of the box
    // stop if we touch a wall
    const seen = new Set<string>();
    const queue: number[][] = [];
    if (bigGrid[newX][newY] === "[") {
      queue.push([newX, newY]);
      queue.push([newX, newY + 1]);
    } else {
      queue.push([newX, newY]);
      queue.push([newX, newY - 1]);
    }

    let hitWall = false;
    while (queue.length > 0) {
      const [x, y] = queue.pop() ?? [];

      const key = `${x},${y}`;
      if (seen.has(key)) {
        continue;
      }
      seen.add(key);

      const nx = x + dx;
      const ny = y + dy;
      const nextSpace = bigGrid[nx][ny];

      if (nextSpace === WALL) {
        hitWall = true;
        break;
      }
      if (nextSpace === "[") {
        queue.push([nx, ny]);
        queue.push([nx, ny + 1]);
      }
      if (nextSpace === "]") {
        queue.push([nx, ny]);
        queue.push([nx, ny - 1]);
      }
    }
    if (hitWall) {
      // cannot move boxes into wall
      return;
    }

    const gridCopy = bigGrid.map((row) => [...row]);
    // empty out the spaces being moved
    seen.forEach((coord) => {
      const [x, y] = coord.split(",").map(Number);
      gridCopy[x][y] = EMPTY_SPACE;
    });

    // move the boxes based on direction
    seen.forEach((coord) => {
      const [x, y] = coord.split(",").map(Number);
      gridCopy[x + dx][y + dy] = bigGrid[x][y];
    });

    bigGrid = gridCopy;

    // move the bot
    bigGrid[bot.x][bot.y] = EMPTY_SPACE;
    bot.x = newX;
    bot.y = newY;
    // bigGrid[newX][newY] = "@";
  });

  return calculateGPS(bigGrid);
}
const partTwo = solvePartTwo();
console.log({ partTwo });

function embiggenGrid() {
  const bigGrid: string[][] = [];
  for (let x = 0; x < ogGrid.length; x++) {
    const bigRow: string[] = [];
    for (let y = 0; y < ogGrid[0].length; y++) {
      const space = ogGrid[x][y];
      if (space === WALL) {
        bigRow.push("#");
        bigRow.push("#");
      } else if (space === BOX) {
        bigRow.push("[");
        bigRow.push("]");
      } else if (space === EMPTY_SPACE) {
        bigRow.push(".");
        bigRow.push(".");
      } else if (space === "@") {
        bigRow.push("@");
        bigRow.push(".");
      }
    }
    bigGrid.push(bigRow);
  }
  return bigGrid;
}

function calculateGPS(grid: string[][]) {
  let total = 0;
  for (let x = 1; x < grid.length - 1; x++) {
    for (let y = 1; y < grid[0].length - 1; y++) {
      if (grid[x][y] === "[" || grid[x][y] === BOX) {
        total += 100 * x + y;
      }
    }
  }
  return total;
}

document.getElementById("partOne")?.appendChild(document.createTextNode(partOne.toString()));
document.getElementById("partTwo")?.appendChild(document.createTextNode(partTwo.toString()));

