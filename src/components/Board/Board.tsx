import React, { FC, useState, useEffect } from 'react';

import { TETROMINOS, START_COLUMN, END_COLUMN } from '../../constants';
import { createBoard } from '../../utils';

import styles from './Board.module.css';

const Board: FC = () => {
  const [board, setBoard] = useState(createBoard());

  const renderTetromino = () => {
    const currentTetromino = TETROMINOS.O;

    return board.map((row, yIdx) => {
      if (yIdx < currentTetromino.length) {
        return row.map((cell, xIdx) => {
          if (START_COLUMN <= xIdx && xIdx < END_COLUMN) {
            return { ...cell, value: currentTetromino[yIdx][xIdx - 3] };
          }
          return cell;
        });
      }
      return row;
    });
  };

  useEffect(() => {
    setBoard(renderTetromino());
  }, []);

  return (
    <div className={styles.wrapper}>
      {board.map((row) => row.map((cell) => <div>{cell.value}</div>))}
    </div>
  );
};

export default Board;
