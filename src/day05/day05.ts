// Advent of Code day 5
// https://adventofcode.com/2024/day/5

import { rawInput } from "./rawInput";

const parts = rawInput.split("\n\n");

const rules = parts[0].split("\n").map((lines) => lines.split("|").map(Number));
const updates = parts[1].split("\n").map((lines) => lines.split(",").map(Number));

const savedRules = new Map<number, number[]>();

rules.forEach(([first, second]) => {
  const savedRule = savedRules.get(first);
  if (savedRule === undefined) {
    savedRules.set(first, [second]);
  } else {
    savedRules.set(first, [...savedRule, second]);
  }
});

function isValid(update: number[]) {
  for (let i = 1; i < update.length; i++) {
    const page = update[i];
    const savedRule = savedRules.get(page);
    if (savedRule === undefined) {
      // we don't have a rule for this page - skip
      continue;
    }

    for (let j = 0; j < savedRule.length; j++) {
      const rule = savedRule[j];
      const indexOf = update.indexOf(rule);
      if (indexOf === -1) {
        // number not in update skip
        continue;
      }
      if (indexOf < i) {
        // number is before the rule - stop
        return false;
      }
    }
  }

  return true;
}

function fixOrder(update: number[]) {
  for (let i = 1; i < update.length; i++) {
    const page = update[i];
    const savedRule = savedRules.get(page);
    if (savedRule === undefined) {
      // we don't have a rule for this page - skip
      continue;
    }
    for (let j = 0; j < savedRule.length; j++) {
      const rule = savedRule[j];
      const indexOf = update.indexOf(rule);
      if (indexOf === -1) {
        // number not in update skip
        continue;
      }

      if (indexOf < i) {
        // number is before the rule - swap the numbers then recheck from start
        update[i] = rule;
        update[indexOf] = page;
        i = 1;
        break;
      }
    }
  }

  return update;
}

let partOne = 0;
let partTwo = 0;
updates.forEach((update) => {
  if (isValid(update)) {
    const middleNumber = update[Math.floor(update.length / 2)];
    partOne += middleNumber;
  } else {
    // part two fixes
    const newUpdate = fixOrder([...update]);
    const middleNumber = newUpdate[Math.floor(update.length / 2)];
    partTwo += middleNumber;
  }
});

console.log({ partOne });
console.log({ partTwo });

document.getElementById("partOne")?.appendChild(document.createTextNode(partOne.toString()));
document.getElementById("partTwo")?.appendChild(document.createTextNode(partTwo.toString()));

