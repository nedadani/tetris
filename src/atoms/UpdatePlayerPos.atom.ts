import { atom } from 'jotai';

import { playerAtom, gameOverAtom } from '../atoms';

const updatePlayerPosAtom = atom(null, (get, set, { x, y, collided }) => {
  const player = get(playerAtom);
  const isGameOver = get(gameOverAtom);

  if (!isGameOver) {
    set(playerAtom, { ...player, pos: { x: player.pos.x + x, y: player.pos.y + y }, collided });
  }
});

export { updatePlayerPosAtom };
