import { useState } from 'react';
import { useAtom } from 'jotai';
import { useAtomValue } from 'jotai/utils';

import {
  usePlayer,
  useBoard,
  useInterval,
  UpdatePlayerPosTypes,
  PlayerTypes,
} from '../../utils/hooks';
import { checkIfCollided, CreateBoardTypes } from '../../utils';
import { gameOverAtom } from '../../atoms';

import { DROP_TIME } from '../../constants';

const useControls = (
  rotatePlayer: (board: CreateBoardTypes, direction: number) => void,
  updatePlayerPos: ({ x, y, collided }: UpdatePlayerPosTypes) => void,
  player: PlayerTypes,
  board: CreateBoardTypes
) => {
  const [dropTime, setDropTime] = useState<number | null>(DROP_TIME);
  const [isGameOver, setIsGameOver] = useAtom(gameOverAtom);

  useInterval(() => {
    dropTetromino();
  }, dropTime);

  const moveTetromino = (direction: number) => {
    if (!checkIfCollided(player, board, { x: direction, y: 0 })) {
      updatePlayerPos({ x: direction, y: 0, collided: false });
    }
  };

  const dropTetromino = () => {
    if (!checkIfCollided(player, board, { x: 0, y: 1 })) {
      updatePlayerPos({ x: 0, y: 1, collided: false });
    } else {
      if (player.pos.y < 1) {
        setIsGameOver(true);
        setDropTime(null);
      }
      updatePlayerPos({ x: 0, y: 1, collided: true });
    }
  };

  const handleKeydown = (key: string) => {
    if (isGameOver) return;

    if (key === 'ArrowLeft') {
      moveTetromino(-1);
    } else if (key === 'ArrowRight') {
      moveTetromino(1);
    } else if (key === 'ArrowDown') {
      dropTetromino();
    } else if (key === 'ArrowUp') {
      // rotating clockwise, can add a counter-clockwise statement too
      rotatePlayer(board, 1);
    }
  };

  return { handleKeydown };
};

export { useControls };
