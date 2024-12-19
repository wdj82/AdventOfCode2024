// Advent of Code day 19
// https://adventofcode.com/2024/day/19

import { rawInput } from "./rawInput";

const [rawTowels, rawTargets] = rawInput.split("\n\n");
const towels = rawTowels.split(", ");
const targetDesigns = rawTargets.split("\n");

const map = new Map();
map.set("", 1);
// recursively search for all possible ways to create the target design
// use hashmap to save previous solutions
function getAllWays(target: string) {
  if (map.has(target)) {
    return map.get(target);
  }

  let answer = 0;
  towels.forEach((towel) => {
    if (target.startsWith(towel)) {
      answer += getAllWays(target.slice(towel.length));
    }
  });
  map.set(target, answer);
  return answer;
}

let partOne = 0;
let partTwo = 0;
targetDesigns.forEach((target) => {
  const ways = getAllWays(target);
  if (ways > 0) {
    // part one only cares if there is a solution
    partOne += 1;
  }
  partTwo += ways;
});
console.log({ partOne });
console.log({ partTwo });
document.getElementById("partOne")?.appendChild(document.createTextNode(partOne.toString()));
document.getElementById("partTwo")?.appendChild(document.createTextNode(partTwo.toString()));
