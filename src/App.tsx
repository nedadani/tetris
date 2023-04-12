import { useEffect, useRef } from 'react';
import { useAtomValue } from 'jotai';

import Board from './components/Board';
import StartGameModal from './components/StartGameModal';
import GameOverModal from './components/GameOverModal';

import { startGameAtom, gameOverAtom } from './atoms';

import styles from './App.module.css';

const App = () => {
  const startGame = useAtomValue(startGameAtom);
  const isGameOver = useAtomValue(gameOverAtom);
  const gameArea = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (gameArea.current?.firstChild) {
      (gameArea.current.firstChild as HTMLButtonElement).focus();
    }
  }, [startGame, isGameOver]);

  return (
    <div className={styles.wrapper} ref={gameArea}>
      {startGame && <StartGameModal />}
      {!startGame && isGameOver && <GameOverModal />}
      <Board />
    </div>
  );
};

export default App;
