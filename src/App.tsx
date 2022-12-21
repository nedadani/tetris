import React, { SyntheticEvent } from 'react';
import { useAtom } from 'jotai';
import { useAtomValue } from 'jotai/utils';

import Board from './components/Board';
import { useControls, usePlayer } from './utils/hooks';
import { gameOverAtom } from './atoms';

import styles from './App.module.css';

const App = () => {
  return (
    <div className={styles.wrapper}>
      <Board />
    </div>
  );
};

export default App;
