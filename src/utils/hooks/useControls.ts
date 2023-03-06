import { useState, useEffect } from 'react';
import { useAtom } from 'jotai';

import { useInterval, usePlayer, useBoard } from '../../utils/hooks';
import { checkIfCollided } from '../../utils';
import { gameOverAtom } from '../../atoms';

import { DROP_TIME } from '../../constants';

const useControls = () => {
  const [touchStart, setTouchStart] = useState({ x: 0, y: 0 });
  const [touchEnd, setTouchEnd] = useState({ x: 0, y: 0 });

  const [dropTime, setDropTime] = useState<number | null>(DROP_TIME);
  const [isGameOver, setIsGameOver] = useAtom(gameOverAtom);

  const { player, updatePlayerPos, rotatePlayer } = usePlayer();
  const { board } = useBoard();

  useEffect(() => {
    const { x: startX, y: startY } = touchStart;
    const { x: endX, y: endY } = touchEnd;

    if ((startX && endX) || (startY && endY)) {
      if (Math.abs(startX - endX) > 100) {
        if (endX < startX) alert('swiped left!');
        if (endX > startX) alert('swiped right!');
      }
      if (Math.abs(startY - endY) > 100) {
        if (endY < startY) alert('rotate');
        if (endY > startY) alert('swiped down!');
      }

      setTouchEnd({ x: 0, y: 0 });
      setTouchStart({ x: 0, y: 0 });
    }
  }, [touchStart, touchEnd, setTouchStart, setTouchEnd]);

  useInterval(() => {
    dropTetromino();
  }, dropTime);

  const moveTetromino = (direction: number) => {
    if (!checkIfCollided(player, board, { x: direction, y: 0 })) {
      updatePlayerPos({ x: direction, y: 0, collided: false });
    }
  };

  const dropTetromino = () => {
    if (!checkIfCollided(player, board, { x: 0, y: 1 })) {
      updatePlayerPos({ x: 0, y: 1, collided: false });
    } else {
      if (player.pos.y < 1) {
        setIsGameOver(true);
        setDropTime(null);
      }
      updatePlayerPos({ x: 0, y: 0, collided: true });
    }
  };

  const handleKeydown = (key: string) => {
    if (isGameOver) return;

    if (key === 'ArrowLeft') {
      moveTetromino(-1);
    } else if (key === 'ArrowRight') {
      moveTetromino(1);
    } else if (key === 'ArrowDown') {
      dropTetromino();
    } else if (key === 'ArrowUp') {
      // rotating clockwise, can add a counter-clockwise statement too
      rotatePlayer(1);
    }
  };

  return { handleKeydown, setTouchStart, setTouchEnd };
};

export { useControls };
