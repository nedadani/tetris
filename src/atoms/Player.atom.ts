import { atom } from 'jotai';

import { BOARD_WIDTH } from '../constants';
import { getRandomTetromino } from '../utils/getRandomTetromino';

interface PlayerTypes {
  pos: { x: number; y: number };
  tetromino: number[][];
  collided: boolean;
}

const playerAtom = atom<PlayerTypes>({
  pos: { x: BOARD_WIDTH / 2 - 2, y: 0 },
  tetromino: getRandomTetromino(),
  collided: false,
});

export { playerAtom };
export type { PlayerTypes };
