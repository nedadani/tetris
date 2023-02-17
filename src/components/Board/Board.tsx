import { FC, useEffect, useRef } from 'react';
import { useAtomValue } from 'jotai';

import { gameOverAtom } from '../../atoms';
import { usePlayer, useBoard, useControls } from '../../utils/hooks';

import styles from './Board.module.css';

const Board: FC = () => {
  const isGameOver = useAtomValue(gameOverAtom);
  const gameArea = useRef<HTMLDivElement>(null);

  const { player, resetPlayer, updatePlayerPos, rotatePlayer } = usePlayer();
  const { board, setBoard } = useBoard(player, resetPlayer);
  const { handleKeydown } = useControls(rotatePlayer, updatePlayerPos, player, board);

  useEffect(() => {
    if (gameArea.current) gameArea.current.focus();
  }, []);

  return (
    <div
      className={styles.wrapper}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => handleKeydown(e.key)}
      ref={gameArea}
    >
      {board.map((row, xIdx) =>
        row.map((cell, yIdx) => <div key={`${xIdx}-${yIdx}`}>{cell.value}</div>)
      )}
    </div>
  );
};

export default Board;
