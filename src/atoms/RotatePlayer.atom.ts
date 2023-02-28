import { atom } from 'jotai';

import { boardAtom, playerAtom } from '.';
import { checkIfCollided } from '../utils';

const rotatePlayerAtom = atom(null, (get, set, direction: number) => {
  const player = get(playerAtom);
  const board = get(boardAtom);

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

  set(playerAtom, playerCopy);
});

export { rotatePlayerAtom };
