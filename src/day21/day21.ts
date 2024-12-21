// Advent of Code day 21
// https://adventofcode.com/2024/day/21

import { rawInput } from "./rawInput";

const codes = rawInput.split("\n");

type Point = { x: number; y: number };

const directions = {
  "^": { x: 0, y: -1 },
  ">": { x: 1, y: 0 },
  v: { x: 0, y: 1 },
  "<": { x: -1, y: 0 },
};

const numericKeypad: Record<string, Point> = {
  7: { x: 0, y: 0 },
  8: { x: 1, y: 0 },
  9: { x: 2, y: 0 },
  4: { x: 0, y: 1 },
  5: { x: 1, y: 1 },
  6: { x: 2, y: 1 },
  1: { x: 0, y: 2 },
  2: { x: 1, y: 2 },
  3: { x: 2, y: 2 },
  error: { x: 0, y: 3 },
  0: { x: 1, y: 3 },
  A: { x: 2, y: 3 },
};

const directionalKeypad: Record<string, Point> = {
  error: { x: 0, y: 0 },
  "^": { x: 1, y: 0 },
  A: { x: 2, y: 0 },
  "<": { x: 0, y: 1 },
  v: { x: 1, y: 1 },
  ">": { x: 2, y: 1 },
};

const getCommand = (input: Record<string, Point>, start: string, end: string) => {
  if (start === end) return ["A"];

  const queue = [{ ...input[start], path: "" }];
  const distances: Record<string, number> = {};

  const allPaths: string[] = [];
  while (queue.length > 0) {
    const current = queue.shift();
    if (current === undefined) break;

    if (current.x === input[end].x && current.y === input[end].y) {
      allPaths.push(current.path + "A");
    }
    const savedDistance = distances[`${current.x},${current.y}`];
    if (savedDistance !== undefined && savedDistance < current.path.length) {
      continue;
    }

    Object.entries(directions).forEach(([direction, vector]) => {
      const nextPosition = { x: current.x + vector.x, y: current.y + vector.y };

      if (input.error.x === nextPosition.x && input.error.y === nextPosition.y) return;

      const button = Object.values(input).find((button) => button.x === nextPosition.x && button.y === nextPosition.y);
      if (button !== undefined) {
        const newPath = current.path + direction;
        if (
          distances[`${nextPosition.x},${nextPosition.y}`] === undefined ||
          distances[`${nextPosition.x},${nextPosition.y}`] >= newPath.length
        ) {
          queue.push({ ...nextPosition, path: newPath });
          distances[`${nextPosition.x},${nextPosition.y}`] = newPath.length;
        }
      }
    });
  }

  return allPaths;
};

const getKeyPresses = (
  input: Record<string, Point>,
  code: string,
  robot: number,
  memo: Record<string, number>,
): number => {
  const key = `${code},${robot}`;
  if (memo[key] !== undefined) return memo[key];

  let current = "A";
  let length = 0;
  for (let i = 0; i < code.length; i++) {
    const moves = getCommand(input, current, code[i]);
    if (robot === 0) length += moves[0].length;
    else length += Math.min(...moves.map((move) => getKeyPresses(directionalKeypad, move, robot - 1, memo)));
    current = code[i];
  }

  memo[key] = length;
  return length;
};

const solvePartOne = () => {
  const memo: Record<string, number> = {};
  let result = 0;
  codes.forEach((code) => {
    result += Number(code.slice(0, 3)) * getKeyPresses(numericKeypad, code, 2, memo);
  });
  return result;
};

const solvePartTwo = () => {
  const memo: Record<string, number> = {};
  let result = 0;
  codes.forEach((code) => {
    result += Number(code.slice(0, 3)) * getKeyPresses(numericKeypad, code, 25, memo);
  });
  return result;
};

const partOne = solvePartOne();
console.log({ partOne });
const partTwo = solvePartTwo();
console.log({ partTwo });

document.getElementById("partOne")?.appendChild(document.createTextNode(partOne.toString()));
document.getElementById("partTwo")?.appendChild(document.createTextNode(partTwo.toString()));

