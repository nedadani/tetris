import { useAtomValue, useSetAtom } from 'jotai';

import { playerAtom, updatePlayerPosAtom, rotatePlayerAtom, resetPlayerAtom } from '../../atoms';

const usePlayer = () => {
  const player = useAtomValue(playerAtom);
  const updatePlayerPos = useSetAtom(updatePlayerPosAtom);
  const rotatePlayer = useSetAtom(rotatePlayerAtom);
  const resetPlayer = useSetAtom(resetPlayerAtom);

  return { player, updatePlayerPos, resetPlayer, rotatePlayer };
};

export { usePlayer };
