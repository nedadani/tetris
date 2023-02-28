import { atom } from 'jotai';

import { playerAtom } from '../atoms';
import { BOARD_WIDTH } from '../constants';
import { getRandomTetromino } from '../utils';

const resetPlayerAtom = atom(null, (_, set) => {
  set(playerAtom, {
    pos: { x: BOARD_WIDTH / 2 - 2, y: 0 },
    tetromino: getRandomTetromino(),
    collided: false,
  });
});

export { resetPlayerAtom };
