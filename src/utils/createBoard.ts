import { BOARD_HEIGHT, BOARD_WIDTH, DEFAULT_CELL } from '../constants';

const createBoard = () => {
  return Array.from({ length: BOARD_HEIGHT }, () =>
    Array.from({ length: BOARD_WIDTH }, () => ({ ...DEFAULT_CELL }))
  );
};

export { createBoard };
