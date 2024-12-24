// Advent of Code day 24
// https://adventofcode.com/2024/day/24

import { rawInput } from "./rawInput";

const [startValues, gates] = rawInput.split("\n\n").map((sections) => sections.split("\n"));

function solvePartOne() {
  const wires: Record<string, number> = {};
  startValues.forEach((line) => {
    const [gate, value] = line.split(": ");
    wires[gate] = Number(value);
  });

  const instructions = gates.map((gate) => {
    const tokens = gate.split(" ");
    return { a: tokens[0], operation: tokens[1], b: tokens[2], output: tokens[4], executed: false };
  });

  while (instructions.some((instruction) => instruction.executed === false)) {
    instructions.forEach(({ a, b, operation, output, executed }, index) => {
      if (executed) return;
      if (wires[a] === undefined || wires[b] === undefined) return;

      if (operation === "AND") {
        wires[output] = wires[a] & wires[b];
      }
      if (operation === "OR") {
        wires[output] = wires[a] | wires[b];
      }
      if (operation === "XOR") {
        wires[output] = wires[a] ^ wires[b];
      }
      instructions[index].executed = true;
    });
  }

  // convert the z-indexes to binary then an integer
  return parseInt(
    Object.keys(wires)
      // get the z indexes
      .filter((wire) => wire[0] === "z")
      .sort((a, b) => b.localeCompare(a))
      // convert to binary
      .map((wire) => wires[wire].toString(2))
      .join(""),
    2,
  );
}
const partOne = solvePartOne();
console.log({ partOne });

function solvePartTwo() {
  const instructions = gates.map((gate) => {
    const tokens = gate.split(" ");
    return { a: tokens[0], operation: tokens[1], b: tokens[2], output: tokens[4] };
  });

  const BIT_LENGTH = 45;

  // for my input, no carry flags were swapped
  const incorrect: string[] = [];
  for (let i = 0; i < BIT_LENGTH; i++) {
    const id = i.toString().padStart(2, "0");
    const xor1 = instructions.find(
      (instruction) =>
        ((instruction.a === `x${id}` && instruction.b === `y${id}`) ||
          (instruction.a === `y${id}` && instruction.b === `x${id}`)) &&
        instruction.operation === "XOR",
    );
    const and1 = instructions.find(
      (instruction) =>
        ((instruction.a === `x${id}` && instruction.b === `y${id}`) ||
          (instruction.a === `y${id}` && instruction.b === `x${id}`)) &&
        instruction.operation === "AND",
    );
    const z = instructions.find((instruction) => instruction.output === `z${id}`);

    if (xor1 === undefined || and1 === undefined || z === undefined) continue;

    // each z must be connected to an XOR
    if (z.operation !== "XOR") incorrect.push(z.output);

    // each AND must go to an OR (besides the first case as it starts the carry flag)
    const or = instructions.find((instruction) => instruction.a === and1.output || instruction.b === and1.output);
    if (or !== undefined && or.operation !== "OR" && i > 0) incorrect.push(and1.output);

    // the first XOR must to go to XOR or AND
    const after = instructions.find((instruction) => instruction.a === xor1.output || instruction.b === xor1.output);
    if (after !== undefined && after.operation === "OR") incorrect.push(xor1.output);
  }

  // each XOR must be connected to an x, y, or z
  incorrect.push(
    ...instructions
      .filter(
        (instruction) =>
          !instruction.a[0].match(/[xy]/g) &&
          !instruction.b[0].match(/[xy]/g) &&
          !instruction.output[0].match(/[z]/g) &&
          instruction.operation === "XOR",
      )
      .map((instruction) => instruction.output),
  );

  return incorrect.sort().join(",");
}
const partTwo = solvePartTwo();
console.log({ partTwo });

document.getElementById("partOne")?.appendChild(document.createTextNode(partOne.toString()));
document.getElementById("partTwo")?.appendChild(document.createTextNode(partTwo.toString()));

