import { FC } from 'react';
import { useAtom, useAtomValue } from 'jotai';

import { gameOverAtom } from '../../atoms';
import { usePlayer, useBoard, useControls } from '../../utils/hooks';

import styles from './Board.module.css';

const Board: FC = () => {
  const isGameOver = useAtomValue(gameOverAtom);

  const { player, resetPlayer, updatePlayerPos, rotatePlayer } = usePlayer();
  const { board, setBoard } = useBoard(player, resetPlayer);
  const { handleKeydown } = useControls(rotatePlayer, updatePlayerPos, player, board);

  return (
    <div
      className={styles.wrapper}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => handleKeydown(e.key)}
    >
      {board.map((row, xIdx) =>
        row.map((cell, yIdx) => <div key={`${xIdx}-${yIdx}`}>{cell.value}</div>)
      )}
    </div>
  );
};

export default Board;
