// Advent of Code day 13
// https://adventofcode.com/2024/day/13

import { rawInput } from "./rawInput";

const machines = rawInput
  .split("\n\n")
  .map((machine) => machine.split("\n"))
  .map((line) => {
    const [buttonA, buttonB, prize] = line.map((m) =>
      m
        .split(": ")[1]
        .split(", ")
        .map((value) => value.slice(2))
        .map(Number),
    );

    return {
      buttonA: [buttonA[0], buttonA[1]],
      buttonB: [buttonB[0], buttonB[1]],
      prize: [prize[0], prize[1]],
    };
  });

function minTokensToWin([ax, ay]: number[], [bx, by]: number[], [prizeX, prizeY]: number[]) {
  const bPresses = Math.floor((ay * prizeX - ax * prizeY) / (ay * bx - ax * by));
  const aPresses = Math.floor((prizeX - bx * bPresses) / ax);
  if (ax * aPresses + bx * bPresses === prizeX && ay * aPresses + by * bPresses === prizeY) {
    return aPresses * 3 + bPresses;
  }
  return 0;
}

let partOne = 0;
machines.forEach(({ buttonA, buttonB, prize }) => {
  partOne += minTokensToWin(buttonA, buttonB, prize);
});
console.log({ partOne });

let partTwo = 0;
machines.forEach(({ buttonA, buttonB, prize }) => {
  partTwo += minTokensToWin(
    buttonA,
    buttonB,
    prize.map((p) => p + 10000000000000),
  );
});
console.log({ partTwo });

document.getElementById("partOne")?.appendChild(document.createTextNode(partOne.toString()));
document.getElementById("partTwo")?.appendChild(document.createTextNode(partTwo.toString()));
