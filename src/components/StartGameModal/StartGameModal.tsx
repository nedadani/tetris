import React, { FC } from 'react';
import { useSetAtom } from 'jotai';

import { startGameAtom, gameOverAtom } from '../../atoms';
import Button from '../Button';
import Modal from '../Modal';

import styles from './StartGameModal.module.css';

const StartGameModal: FC = () => {
  const setStartGame = useSetAtom(startGameAtom);
  const setGameOver = useSetAtom(gameOverAtom);

  return (
    <Modal>
      <p className={styles.text}>
        Use arrow keys or swipe motions (on touchscreen devices) to navigate the tetrominos.
      </p>
      <p className={styles.text}>Click "Start" to start the game.</p>

      <Button
        onClick={() => {
          setStartGame(false);
          setGameOver(false);
        }}
      >
        START
      </Button>
    </Modal>
  );
};

export default StartGameModal;
