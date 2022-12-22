import { useAtom } from 'jotai';
import { useAtomValue } from 'jotai/utils';

import { usePlayer, useBoard, UpdatePlayerPosTypes } from '../../utils/hooks';
import { gameOverAtom } from '../../atoms';

const useControls = (updatePlayerPos: ({ x, y, collided }: UpdatePlayerPosTypes) => void) => {
  const isGameOver = useAtomValue(gameOverAtom);

  const move = () => {};

  const drop = () => {
    updatePlayerPos({ x: 0, y: 1, collided: false });
  };

  const moveTetromino = (direction: number) => {
    move();
    updatePlayerPos({ x: direction, y: 0, collided: false });
  };

  const dropTetromino = () => {
    drop();
  };

  const handleKeydown = (key: string) => {
    if (isGameOver) return;

    if (key === 'ArrowLeft') {
      moveTetromino(-1);
    } else if (key === 'ArrowRight') {
      moveTetromino(1);
    } else if (key === 'ArrowDown') {
      dropTetromino();
    }
  };

  return { handleKeydown };
};

export { useControls };
