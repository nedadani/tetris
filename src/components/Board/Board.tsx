import { FC } from 'react';
import { useAtomValue } from 'jotai';

import { gameOverAtom } from '../../atoms';
import { useBoard, useControls } from '../../utils/hooks';

import styles from './Board.module.css';

const Board: FC = () => {
  const isGameOver = useAtomValue(gameOverAtom);
  const { board } = useBoard();
  const { handleKeydown } = useControls();

  return (
    <div
      className={styles.wrapper}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => handleKeydown(e.key)}
    >
      {board.map((row, xIdx) =>
        row.map((cell, yIdx) => (
          <div key={`${xIdx}-${yIdx}`} className={styles.cell}>
            {cell.value}
          </div>
        ))
      )}
    </div>
  );
};

export default Board;
