import { rawInput } from "./rawInput";

const computers = rawInput.split("\n").map((line) => line.split("-"));
const graph: Record<string, string[]> = {};
let maxLength = 0;
computers.forEach(([left, right]) => {
  graph[left] ??= [];
  graph[right] ??= [];
  graph[left].push(right);
  graph[right].push(left);
  maxLength = Math.max(maxLength, graph[left].length, graph[right].length);
});

// find all combinations of array with k entries
function combination(array: string[], k: number) {
  let result: string[][] = [];

  const helper = (_array: string[], _k: number, _i: number, _current: string[]) => {
    if (_current.length == k) result.push(_current);
    if (_current.length == k || _i == _array.length) return;

    helper(_array, _k, _i + 1, [_array[_i], ..._current]);
    helper(_array, _k, _i + 1, [..._current]);
  };

  helper(array, k, 0, []);
  return result;
}

// recursively find the set that can loop given a size time
// note: this function only works for size 3
function findSet(graph: { [key: string]: string[] }, path: string[], size: number): string[][] {
  const current = path.at(-1) as string;
  if (path.length === size + 1) {
    if (current === path[0]) return [path.slice(0, size)];
    else return [];
  }

  // check for repeats
  if (new Set(path).size !== path.length) return [];

  const allSets: string[][] = [];
  for (let i = 0; i < graph[current].length; i++) {
    path.push(graph[current][i]);
    const sets = findSet(graph, path, size);
    path.pop();

    if (sets.length > 0) allSets.push(...sets);
  }
  return allSets;
}

function solvePartOne() {
  let allSets = new Set<string>();
  Object.keys(graph).forEach((node) => {
    allSets = allSets.union(new Set(findSet(graph, [node], 3).map((set) => set.sort().join(","))));
  });

  return Array.from(allSets).reduce((sum, set) => {
    if (set.split(",").find((node) => node.startsWith("t")) !== undefined) sum++;
    return sum;
  }, 0);
}

function solvePartTwo() {
  // find the biggest set intersection between all connections
  let biggest: string[] = [];

  Object.keys(graph).forEach((node) => {
    const possible = combination(graph[node].sort(), maxLength - 1);
    for (let i = 0; i < possible.length; i++) {
      let common = new Set([node, ...graph[node]].sort());
      for (let j = 0; j < possible[i].length; j++) {
        common = common.intersection(new Set([possible[i][j], ...graph[possible[i][j]]]));
      }
      if (common.size === maxLength) {
        biggest = Array.from(common);
      }
    }
  });

  return biggest.sort().join(",");
}

const partOne = solvePartOne();
const partTwo = solvePartTwo();
console.log({ partOne });
console.log({ partTwo });
document.getElementById("partOne")?.appendChild(document.createTextNode(partOne.toString()));
document.getElementById("partTwo")?.appendChild(document.createTextNode(partTwo.toString()));

