import { useState, useEffect } from 'react';
import { useAtom } from 'jotai';

import { useInterval, usePlayer, useBoard } from '../../utils/hooks';
import { checkIfCollided } from '../../utils';
import { gameOverAtom } from '../../atoms';

import { DROP_TIME } from '../../constants';

const useControls = () => {
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchStartY, setTouchStartY] = useState(0);
  const [touchEndX, setTouchEndX] = useState(0);
  const [touchEndY, setTouchEndY] = useState(0);
  const [dropTime, setDropTime] = useState<number | null>(DROP_TIME);
  const [isGameOver, setIsGameOver] = useAtom(gameOverAtom);

  const { player, updatePlayerPos, rotatePlayer } = usePlayer();
  const { board } = useBoard();

  useEffect(() => {
    if (touchStartX && touchEndX && Math.abs(touchStartX - touchEndX) > 100) {
      if (touchEndX < touchStartX) alert('swiped left!');
      if (touchEndX > touchStartX) alert('swiped right!');

      setTouchEndX(0);
      setTouchStartX(0);
    }
  }, [touchStartX, touchEndX, setTouchStartX, setTouchEndX]);

  useEffect(() => {
    if (touchStartY && touchEndY && Math.abs(touchStartY - touchEndY) > 100) {
      if (touchEndY < touchStartY) alert('rotate');
      if (touchEndY > touchStartY) alert('swiped down!');

      setTouchEndY(0);
      setTouchStartY(0);
    }
  }, [touchStartY, touchEndY, setTouchStartY, setTouchEndY]);

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

  const setTouchStart = (x: number, y: number) => {
    setTouchStartX(x);
    setTouchStartY(y);
  };

  const setTouchEnd = (x: number, y: number) => {
    setTouchEndX(x);
    setTouchEndY(y);
  };

  return { handleKeydown, setTouchStart, setTouchEnd };
};

export { useControls };
