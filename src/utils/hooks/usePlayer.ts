import { useCallback, useState } from 'react';

import { checkIfCollided, CreateBoardTypes } from '../../utils';
import { BOARD_WIDTH } from '../../constants';
import { getRandomTetromino } from '../getRandomTetromino';

interface UpdatePlayerPosTypes {
  x: number;
  y: number;
  collided: boolean;
}

interface PlayerTypes {
  pos: { x: number; y: number };
  tetromino: number[][];
  collided: boolean;
}

const usePlayer = () => {
  const [player, setPlayer] = useState({
    pos: { x: BOARD_WIDTH / 2 - 2, y: 0 },
    tetromino: getRandomTetromino(),
    collided: false,
  });

  const rotate = (tetromino: number[][], direction: number) => {
    // rows to columns and vice versa
    const rotatedTetromino = tetromino.map((_, idx) => tetromino.map((column) => column[idx]));
    // rotate the tetromino to the correct direction
    if (direction > 0) {
      return rotatedTetromino.map((row) => row.reverse());
    } else {
      rotatedTetromino.reverse();
    }
  };

  const rotatePlayer = (board: CreateBoardTypes, direction: number) => {
    const playerCopy = structuredClone(player);
    playerCopy.tetromino = rotate(playerCopy.tetromino, direction);

    const position = playerCopy.pos.x;
    let offset = 1;

    // handle rotation when next to other objects
    while (checkIfCollided(playerCopy, board, { x: 0, y: 0 })) {
      playerCopy.pos.x += offset;
      offset = -(offset + (offset > 0 ? 1 : -1));
      if (offset > playerCopy.tetromino[0].length) {
        rotate(playerCopy.tetromino, -direction);
        playerCopy.pos.x = position;
        return;
      }
    }

    setPlayer(playerCopy);
  };

  const updatePlayerPos = ({ x, y, collided }: UpdatePlayerPosTypes) => {
    setPlayer((prev) => ({
      ...prev,
      pos: { x: prev.pos.x + x, y: prev.pos.y + y },
      collided,
    }));
  };

  const resetPlayer = useCallback(() => {
    setPlayer({
      pos: { x: BOARD_WIDTH / 2 - 2, y: 0 },
      tetromino: getRandomTetromino(),
      collided: false,
    });
  }, []);

  return { player, updatePlayerPos, resetPlayer, rotatePlayer };
};

export { usePlayer };
export type { PlayerTypes, UpdatePlayerPosTypes };
