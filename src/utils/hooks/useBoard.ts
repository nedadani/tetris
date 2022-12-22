import { useState, useEffect } from 'react';

import { createBoard, CreateBoardTypes } from '../../utils';
import { DEFAULT_CELL } from '../../constants';
import { PlayerTypes } from '../../utils/hooks';

const useBoard = (player: PlayerTypes, resetPlayer: () => void) => {
  const [board, setBoard] = useState<CreateBoardTypes>(createBoard());

  useEffect(() => {
    const updateBoard = (prevBoard: CreateBoardTypes) => {
      const newBoard = prevBoard.map((row) =>
        row.map((cell) => (cell.isEmpty ? { ...DEFAULT_CELL } : cell))
      );

      player.tetromino.forEach((row, y) => {
        row.forEach((value, x) => {
          if (value) {
            newBoard[y + player.pos.y][x + player.pos.x] = { value, isEmpty: !player.collided };
          }
        });
      });

      return newBoard;
    };

    setBoard((prev) => updateBoard(prev));
  }, [player]);

  return { board, setBoard };
};

export { useBoard };
