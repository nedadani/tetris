import { FC, useState, useEffect } from 'react';
import { useAtomValue } from 'jotai';

import { gameOverAtom } from '../../atoms';
import { useBoard, useControls } from '../../utils/hooks';

import styles from './Board.module.css';

const Board: FC = () => {
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchStartY, setTouchStartY] = useState(0);
  const [touchEndX, setTouchEndX] = useState(0);
  const [touchEndY, setTouchEndY] = useState(0);

  const isGameOver = useAtomValue(gameOverAtom);
  const { board } = useBoard();
  const { handleKeydown } = useControls();

  useEffect(() => {
    if ((touchStartX && touchEndX) || (touchStartY && touchEndY)) {
      if (Math.abs(touchStartX - touchEndX) > 100) {
        if (touchEndX < touchStartX) alert('swiped left!');
        if (touchEndX > touchStartX) alert('swiped right!');
      }

      if (Math.abs(touchStartY - touchEndY) > 100) {
        if (touchEndY < touchStartY) alert('rotate');
        if (touchEndY > touchStartY) alert('swiped down!');
      }

      setTouchEndX(0);
      setTouchStartX(0);
      setTouchEndY(0);
      setTouchStartY(0);
    }
  }, [
    touchStartX,
    touchEndX,
    touchStartY,
    touchEndY,
    setTouchStartX,
    setTouchStartY,
    setTouchEndX,
    setTouchEndY,
  ]);

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
