// prettier-ignore

const TETROMINOS = {
  O: [
    [0, 'O', 'O', 0],
    [0, 'O', 'O', 0],
    [0,  0,   0,  0],
    [0,  0,   0,  0],
  ],
  I: [
    [0, 'I', 0, 0],
    [0, 'I', 0, 0],
    [0, 'I', 0, 0],
    [0, 'I', 0, 0],
  ],
  T: [
    ['T', 'T', 'T', 0],
    [0,   'T',  0,  0],
    [0,    0,   0,  0],
    [0,    0,   0,  0],
  ],
  L: [
    [0, 'L',  0,  0],
    [0, 'L',  0,  0],
    [0, 'L', 'L', 0],
    [0,  0,   0,  0],
  ],
  J: [
    [0,  0,  'J', 0],
    [0,  0,  'J', 0],
    [0, 'J', 'J', 0],
    [0,  0,   0,  0],
  ],
  S: [
    [0,  0,  'S', 'S'],
    [0, 'S', 'S',  0],
    [0,  0,   0,   0],
    [0,  0,   0,   0],
  ],
  Z: [
    [0, 'Z', 'Z',  0],
    [0,  0,  'Z', 'Z'],
    [0,  0,   0,   0],
    [0,  0,   0,   0],
  ],
};

type TetrominosType = keyof typeof TETROMINOS;

export { TETROMINOS };
export type { TetrominosType };
