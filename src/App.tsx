import { useEffect, useRef } from 'react';
import Board from './components/Board';

import styles from './App.module.css';

const App = () => {
  const gameArea = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (gameArea.current?.firstChild) {
      (gameArea.current.firstChild as HTMLButtonElement).focus();
    }
  }, [gameArea.current]);

  return (
    <div className={styles.wrapper} ref={gameArea}>
      <Board />
    </div>
  );
};

export default App;
