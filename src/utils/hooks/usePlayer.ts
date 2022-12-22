import { useCallback, useState } from 'react';

import { getRandomTetromino } from '..';
import { BOARD_WIDTH } from '../../constants';

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

  const updatePlayerPos = ({ x, y, collided }: UpdatePlayerPosTypes) => {
    setPlayer((prev) => ({
      ...prev,
      pos: { x: (prev.pos.x += x), y: (prev.pos.y += y) },
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

  return { player, updatePlayerPos, resetPlayer };
};

export { usePlayer };
export type { PlayerTypes, UpdatePlayerPosTypes };
