import { FC } from 'react';
import { useAtomValue } from 'jotai';

import { gameOverAtom } from '../../atoms';
import { useBoard, useControls } from '../../utils/hooks';

import styles from './Board.module.css';

const Board: FC = () => {
  const isGameOver = useAtomValue(gameOverAtom);
  const { board } = useBoard();
  const { handleKeydown, setTouchStart, setTouchEnd } = useControls();

  return (
    <div
      className={styles.wrapper}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => handleKeydown(e.key)}
      onClick={(e) => alert('rotate')}
      onTouchStart={(e) =>
        setTouchStart({ x: e.changedTouches[0].screenX, y: e.changedTouches[0].screenY })
      }
      onTouchEnd={(e) =>
        setTouchEnd({ x: e.changedTouches[0].screenX, y: e.changedTouches[0].screenY })
      }
    >
      {board.map((row, xIdx) =>
        row.map((cell, yIdx) => (
          <div key={`${xIdx}-${yIdx}`} className={styles.cell} data-value={cell.value} />
        ))
      )}
    </div>
  );
};

export default Board;
