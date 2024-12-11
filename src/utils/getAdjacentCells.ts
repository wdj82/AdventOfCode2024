// use for traversing the grid
export const searchDirectionsCardinal = [
  { dx: 0, dy: -1 },
  { dx: 0, dy: 1 },
  { dx: -1, dy: 0 },
  { dx: 1, dy: 0 },
];

const searchDirectionsOrdinal = [
  { dx: 0, dy: -1 },
  { dx: 0, dy: 1 },
  { dx: -1, dy: 0 },
  { dx: 1, dy: 0 },
  { dx: -1, dy: 1 },
  { dx: 1, dy: 1 },
  { dx: 1, dy: -1 },
  { dx: -1, dy: -1 },
];

// return in bound adjacent coordinates
export function getAdjacentCellsCardinal(currX: number, currY: number, height: number, width: number) {
  const result = [];

  for (let i = 0; i < searchDirectionsCardinal.length; i++) {
    const newX = searchDirectionsCardinal[i].dx + currX;
    const newY = searchDirectionsCardinal[i].dy + currY;
    if (newX >= 0 && newX < height && newY >= 0 && newY < width) {
      result.push({ newX, newY });
    }
  }
  return result;
}

export function getAdjacentCellsOrdinal(currX: number, currY: number, height: number, width: number) {
  const result = [];

  for (let i = 0; i < searchDirectionsOrdinal.length; i++) {
    const newX = searchDirectionsOrdinal[i].dx + currX;
    const newY = searchDirectionsOrdinal[i].dy + currY;
    if (newX >= 0 && newX < height && newY >= 0 && newY < width) {
      result.push({ newX, newY });
    }
  }
  return result;
}
