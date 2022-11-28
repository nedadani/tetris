import React, { FC, useState, useEffect } from 'react';
import { useAtom } from 'jotai';

import { gameOverAtom } from '../../atoms';
import { START_COLUMN, END_COLUMN } from '../../constants';
import { createBoard, getRandomTetromino } from '../../utils';

import styles from './Board.module.css';

const Board: FC = () => {
  const [board, setBoard] = useState(createBoard());
  const [gameOver, setGameOver] = useAtom(gameOverAtom);

  const renderTetromino = () => {
    const currentTetromino = getRandomTetromino();

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
      {board.map((row, xIdx) =>
        row.map((cell, yIdx) => <div key={`${xIdx}-${yIdx}`}>{cell.value}</div>)
      )}
    </div>
  );
};

export default Board;
