import { atom } from 'jotai';

import { playerAtom } from '../atoms';

const updatePlayerPosAtom = atom(null, (get, set, { x, y, collided }) => {
  const player = get(playerAtom);
  set(playerAtom, { ...player, pos: { x: player.pos.x + x, y: player.pos.y + y }, collided });
});

export { updatePlayerPosAtom };
