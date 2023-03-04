import { FC } from 'react';
import { useAtomValue } from 'jotai';

import { gameOverAtom } from '../../atoms';
import { useBoard, useControls } from '../../utils/hooks';

import styles from './Board.module.css';

const Board: FC = () => {
  const isGameOver = useAtomValue(gameOverAtom);
  const { board } = useBoard();
  const { handleKeydown, setTouchStartX, setTouchStartY, setTouchEndX, setTouchEndY } =
    useControls();

  return (
    <div
      className={styles.wrapper}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => handleKeydown(e.key)}
      onClick={(e) => alert('rotate')}
      onTouchStart={(e) => {
        setTouchStartX(e.changedTouches[0].screenX);
        setTouchStartY(e.changedTouches[0].screenY);
      }}
      onTouchEnd={(e) => {
        setTouchEndX(e.changedTouches[0].screenX);
        setTouchEndY(e.changedTouches[0].screenY);
      }}
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
