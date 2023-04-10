import { useEffect, useRef } from 'react';
import { useAtomValue } from 'jotai';

import Board from './components/Board';
import StartGameModal from './components/StartGameModal';

import { startGameAtom } from './atoms';

import styles from './App.module.css';

const App = () => {
  const showStartGameModal = useAtomValue(startGameAtom);
  const gameArea = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (gameArea.current?.firstChild) {
      (gameArea.current.firstChild as HTMLButtonElement).focus();
    }
  }, [showStartGameModal]);

  if (showStartGameModal) {
    return (
      <div className={styles.wrapper}>
        <StartGameModal />
        <Board />
      </div>
    );
  }

  return (
    <div className={styles.wrapper} ref={gameArea}>
      <Board />
    </div>
  );
};

export default App;
