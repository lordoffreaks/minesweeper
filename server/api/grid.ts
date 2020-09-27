import { shuffle } from "lodash";

export const generateGrid = (width: number, height: number, mines: number) => {
  let tmpGrid = [];
  let grid = [];
  let count = 0;

  for (let i = 0; i < width; i++) {
    for (let j = 0; j < height; j++) {
      const isMine = count < mines;
      const square = { isMine };
      tmpGrid.push(square);
      count++;
    }
  }

  tmpGrid = shuffle(tmpGrid);

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const index = findIndexByCordinate(x, y, width);
      const adjacents = findAdjacents(x, y, width, height, tmpGrid).reduce(
        countMines,
        0
      );
      const square = generateSquare(x, y, adjacents, tmpGrid[index]);

      grid.push(square);
    }
  }

  return grid;
};

const generateSquare = (x, y, adjacents, square) => {
  return {
    ...square,
    adjacents,
    x,
    y,
  };
};

const findAdjacents = (x, y, width, height, grid) => {
  const adjacents = [];

  const range = [1, 0, -1];

  for (let i = 0; i < range.length; i++) {
    for (let j = 0; j < range.length; j++) {
      const xRange = range[i];
      const yRange = range[j];
      const targetX = x + xRange;
      const targetY = y + yRange;

      if (
        (xRange === 0 && yRange === 0) ||
        targetX < 0 ||
        targetY < 0 ||
        targetX >= width ||
        targetY >= height
      ) {
        continue;
      }
      const squareIndex = findIndexByCordinate(targetX, targetY, width);
      if (squareIndex > grid.length - 1) {
        continue;
      }

      adjacents.push(grid[squareIndex]);
    }
  }

  return adjacents;
};

const countMines = (acc, curr) => {
  if (curr.isMine) {
    acc = acc + 1;
  }
  return acc;
};

const findIndexByCordinate = (x, y, width) => {
  const index = x + width * y;
  return index;
};

export const renderGrid = (grid: any[], width: number) => {
  const rows = {};
  let rowIndex = 0;
  for (let index = 0; index < grid.length; index++) {
    const reminder = index % width;
    if (reminder === 0) {
      rowIndex++;
    }
    if (rows[rowIndex] === undefined) {
      rows[rowIndex] = [];
    }

    const square = {
      ...grid[index],
      index,
    };

    rows[rowIndex].push(square);
  }
  return Object.values(rows);
};

export const revealSquare = (grid: any[], index: number) => {
  const square = grid[index];
  grid[index] = {
    ...square,
    reveal: true,
  };

  return { grid, isEnd: square.isMine };
};
