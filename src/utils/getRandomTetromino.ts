import { TETROMINOS, TetrominosType } from '../constants';

const getRandomTetromino = () => {
  const tetrominosArr = Object.keys(TETROMINOS) as TetrominosType[];
  const numberOfTetrominos = tetrominosArr.length;
  const randomNumber = Math.floor(Math.random() * numberOfTetrominos);
  const tetromino = tetrominosArr[randomNumber];

  return TETROMINOS[tetromino];
};

export { getRandomTetromino };
