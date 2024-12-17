// Advent of Code day 17
// https://adventofcode.com/2024/day/17

import { rawInput } from "./rawInput";

const [inputRegisters, inputProgram] = rawInput
  .split("\n\n")
  .map((parts) => parts.split("\n").map((line) => line.split(": ")[1]));

const program = inputProgram[0].split(",").map(Number);
const registers = inputRegisters.map(BigInt);

function runProgram(registers: bigint[]) {
  let pointer = 0;
  const result: bigint[] = [];
  while (pointer < program.length) {
    const opcode = program[pointer];
    const operand = BigInt(program[pointer + 1]);

    const [A, B, C] = registers;

    let combo = operand;
    if (operand === 4n) combo = A;
    if (operand === 5n) combo = B;
    if (operand === 6n) combo = C;

    if (opcode === 0) {
      // a division
      registers[0] = A / 2n ** combo;
    } else if (opcode === 1) {
      // bitwise XOR
      registers[1] = B ^ operand;
    } else if (opcode === 2) {
      // modulo
      registers[1] = combo % 8n;
    } else if (opcode === 3 && A !== 0n) {
      // jump
      pointer = Number(operand);
      continue;
    } else if (opcode === 4) {
      // bitwise XOR
      registers[1] = B ^ C;
    } else if (opcode === 5) {
      // out
      result.push(combo % 8n);
    } else if (opcode === 6) {
      // b division
      registers[1] = A / 2n ** combo;
    } else if (opcode === 7) {
      // c division
      registers[2] = A / 2n ** combo;
    }

    pointer += 2;
  }
  return result.join(",");
}

const partOne = runProgram([...registers]);
console.log({ partOne });

function findMin() {
  const expected = program.join(",");
  let a = 0n;

  while (true) {
    const result = runProgram([a, 0n, 0n]);

    if (result === expected) {
      return Number(a);
    }

    if (expected.endsWith(result)) {
      a = a * 8n;
    } else {
      a++;
    }
  }
}

const partTwo = findMin();
console.log(partTwo);

document.getElementById("partOne")?.appendChild(document.createTextNode(partOne.toString()));
document.getElementById("partTwo")?.appendChild(document.createTextNode(partTwo.toString()));
