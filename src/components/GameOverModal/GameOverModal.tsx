import { FC } from 'react';
import { useSetAtom } from 'jotai';

import { boardAtom, gameOverAtom } from '../../atoms';
import { createBoard } from '../../utils';
import Button from '../Button';
import Modal from '../Modal';

const GameOverModal: FC = () => {
  const setGameOver = useSetAtom(gameOverAtom);
  const clearBoard = useSetAtom(boardAtom);

  return (
    <Modal>
      <p>Game over</p>

      <Button
        onClick={() => {
          clearBoard(createBoard());
          setGameOver(false);
        }}
      >
        TRY AGAIN
      </Button>
    </Modal>
  );
};

export default GameOverModal;
