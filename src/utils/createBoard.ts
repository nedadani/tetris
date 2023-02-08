import { BOARD_HEIGHT, BOARD_WIDTH, DEFAULT_CELL, DefaultCellType } from '../constants';

type CreateBoardTypes = DefaultCellType[][];

const createBoard = (): CreateBoardTypes => {
  return Array.from({ length: BOARD_HEIGHT }, () =>
    Array.from({ length: BOARD_WIDTH }, () => ({ ...DEFAULT_CELL }))
  );
};

export { createBoard };
export type { CreateBoardTypes };
