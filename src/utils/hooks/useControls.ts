import { useAtom } from 'jotai';
import { useAtomValue } from 'jotai/utils';

import { usePlayer, useBoard, UpdatePlayerPosTypes, PlayerTypes } from '../../utils/hooks';
import { checkIfCollided, CreateBoardTypes } from '../../utils';
import { gameOverAtom } from '../../atoms';

const useControls = (
  updatePlayerPos: ({ x, y, collided }: UpdatePlayerPosTypes) => void,
  player: PlayerTypes,
  board: CreateBoardTypes
) => {
  const [isGameOver, setIsGameOver] = useAtom(gameOverAtom);

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
        // set drop time to 0
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
    }
  };

  return { handleKeydown };
};

export { useControls };
