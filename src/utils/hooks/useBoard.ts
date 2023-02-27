import { useEffect } from 'react';
import { useAtom, useAtomValue } from 'jotai';

import { boardAtom, playerAtom } from '../../atoms';
import { CreateBoardTypes } from '../../utils';
import { usePlayer } from '../hooks';
import { DEFAULT_CELL, DefaultCellType } from '../../constants';

const useBoard = () => {
  const [board, setBoard] = useAtom(boardAtom);
  const { resetPlayer } = usePlayer();
  const player = useAtomValue(playerAtom);

  useEffect(() => {
    const clearRows = (newBoard: CreateBoardTypes) =>
      newBoard.reduce((acc, row) => {
        // if no empty cells in the row
        if (row.findIndex((cell) => cell.value === 0) === -1) {
          const emptyRow = new Array<DefaultCellType>(newBoard[0].length).fill(DEFAULT_CELL);
          acc.unshift(emptyRow);
        } else {
          acc.push(row);
        }
        return acc;
      }, [] as DefaultCellType[][]);

    const updateBoard = (prevBoard: CreateBoardTypes) => {
      const newBoard = prevBoard.map((row) =>
        row.map((cell) => (cell.isEmpty ? { ...DEFAULT_CELL } : cell))
      );

      // TODO: find bug here
      player.tetromino.map((row, y) => {
        row.map((value, x) => {
          if (value) {
            newBoard[y + player.pos.y][x + player.pos.x] = { value, isEmpty: !player.collided };
          }
        });
      });

      if (player.collided) {
        resetPlayer();
        return clearRows(newBoard);
      }

      return newBoard;
    };

    setBoard((prev) => updateBoard(prev));
  }, [player, resetPlayer, setBoard]);

  return { board, setBoard };
};

export { useBoard };
