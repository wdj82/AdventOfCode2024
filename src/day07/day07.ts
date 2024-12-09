// Advent of Code day 7
// https://adventofcode.com/2024/day/7

import { rawInput } from "./rawInput";

// const testInput = `190: 10 19
// 3267: 81 40 27
// 83: 17 5
// 156: 15 6
// 7290: 6 8 6 15
// 161011: 16 10 13
// 192: 17 8 14
// 21037: 9 7 18 13
// 292: 11 6 16 20`;

const equations = rawInput
  .split("\n")
  .map((line) => line.split(": "))
  .map(([solution, inputs]) => {
    return { solution: Number(solution), inputs: inputs.split(" ").map(Number) };
  });

type Ops = "add" | "mult" | "concat";

function ops(a: number, b: number, type: Ops) {
  if (type === "add") {
    return a + b;
  }
  if (type === "mult") {
    return a * b;
  }
  return Number(a.toString() + b.toString());
}

function calculate(solution: number, inputs: number[], operations: Ops[], acc = 0) {
  if (inputs.length === 0) {
    return solution === acc;
  }

  const [current, ...rest] = inputs;

  for (let i = 0; i < operations.length; i++) {
    const op = operations[i];
    let total = ops(acc, current, op);
    const isSolution = calculate(solution, rest, operations, total);
    if (isSolution) return true;
  }
}

let partOne = 0;
equations.forEach(({ solution, inputs }) => {
  const isSolution = calculate(solution, inputs, ["add", "mult"]);
  if (isSolution) {
    partOne += solution;
  }
});
console.log({ partOne });

let partTwo = 0;
equations.forEach(({ solution, inputs }) => {
  const isSolution = calculate(solution, inputs, ["add", "mult", "concat"]);
  if (isSolution) {
    partTwo += solution;
  }
});
console.log({ partTwo });

document.getElementById("partOne")?.appendChild(document.createTextNode(partOne.toString()));
document.getElementById("partTwo")?.appendChild(document.createTextNode(partTwo.toString()));
