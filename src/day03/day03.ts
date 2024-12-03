// Advent of Code day 3
// https://adventofcode.com/2024/day/3

// const testInput = `xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))`;
// const testInput2 = `xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))`;

const input = await fetch("rawInput.txt");
const text = await input.text();

const validResultsOne = text.match(/(mul\(\d+,\d+\))/g);

function getMultiple(input: string) {
  const digits = input
    .slice(4, input.length - 1)
    .split(",")
    .map(Number);
  return digits[0] * digits[1];
}

const partOne = validResultsOne?.reduce((acc, curr) => getMultiple(curr) + acc, 0) ?? 0;

console.log({ partOne });

const validResultsTwo = text.match(/(mul\(\d+,\d+\))|(do\(\))|don't\(\)/g);
let isEnabled = true;
const partTwo =
  validResultsTwo?.reduce((acc, curr) => {
    if (curr === "do()") {
      isEnabled = true;
      return acc;
    }
    if (curr === "don't()") {
      isEnabled = false;
      return acc;
    }
    if (!isEnabled) return acc;

    return getMultiple(curr) + acc;
  }, 0) ?? 0;

console.log({ partTwo });

document.getElementById("partOne")?.appendChild(document.createTextNode(partOne.toString()));
document.getElementById("partTwo")?.appendChild(document.createTextNode(partTwo.toString()));
