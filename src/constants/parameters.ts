const BOARD_WIDTH = 12;
const BOARD_HEIGHT = 20;

const TETROMINO_WIDTH = 4;
const START_COLUMN = Math.floor((BOARD_WIDTH - TETROMINO_WIDTH) / 2);
const END_COLUMN = START_COLUMN + TETROMINO_WIDTH;

const DROP_TIME = 1000;

export { BOARD_WIDTH, BOARD_HEIGHT, TETROMINO_WIDTH, START_COLUMN, END_COLUMN, DROP_TIME };
