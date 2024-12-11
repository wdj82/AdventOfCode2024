// Advent of Code day 8
// https://adventofcode.com/2024/day/8

import { rawInput } from "./rawInput";

// const testInput1 = `............
// ........0...
// .....0......
// .......0....
// ....0.......
// ......A.....
// ............
// ............
// ........A...
// .........A..
// ............
// ............`;

const grid = rawInput.split("\n").map((lines) => lines.split(""));
const height = grid.length;
const width = grid[0].length;

type Point = { x: number; y: number };

const antennas = new Map<string, Point[]>();

for (let x = 0; x < height; x++) {
  for (let y = 0; y < width; y++) {
    const cell = grid[x][y];
    // skipping # from test inputs
    if (cell !== "." && cell !== "#") {
      const list = antennas.get(cell) ?? [];
      list.push({ x, y });
      antennas.set(cell, list);
    }
  }
}

const antinodes: { start: Point; vector: Point }[] = [];

antennas.forEach((list) => {
  for (let i = 0; i < list.length; i++) {
    for (let j = 0; j < list.length; j++) {
      if (i === j) continue;
      const x = list[i].x - list[j].x;
      const y = list[i].y - list[j].y;
      antinodes.push({ vector: { x, y }, start: { x: list[i].x, y: list[i].y } });
    }
  }
});

const map = grid.map((row) => row.slice());

let partOne = 0;
antinodes.forEach((antinode) => {
  const nx = antinode.start.x + antinode.vector.x;
  const ny = antinode.start.y + antinode.vector.y;
  if (nx >= 0 && nx < height && ny >= 0 && ny < width && map[nx][ny] !== "#") {
    map[nx][ny] = "#";
    partOne += 1;
  }
});
console.log({ partOne });

let partTwo = 0;
const map2 = grid.map((row) => row.slice());
antinodes.forEach(({ start, vector }) => {
  let nx = start.x + vector.x;
  let ny = start.y + vector.y;

  if (map2[start.x][start.y] !== "#") {
    map2[start.x][start.y] = "#";
    partTwo += 1;
  }

  while (nx >= 0 && nx < height && ny >= 0 && ny < width) {
    if (map2[nx][ny] !== "#") {
      partTwo += 1;
      map2[nx][ny] = "#";
    }
    nx += vector.x;
    ny += vector.y;
  }
});

console.log({ partTwo });

document.getElementById("partOne")?.appendChild(document.createTextNode(partOne.toString()));
document.getElementById("partTwo")?.appendChild(document.createTextNode(partTwo.toString()));
