import { usePlayer, useBoard, UpdatePlayerPosTypes, PlayerTypes } from './hooks';
import { CreateBoardTypes } from './createBoard';

const checkIfCollided = (
  player: PlayerTypes,
  board: CreateBoardTypes,
  { x: moveX, y: moveY }: { x: number; y: number }
) => {
  // using for loops for speed
  for (let y = 0; y < player.tetromino.length; y++) {
    for (let x = 0; x < player.tetromino[y].length; x++) {
      if (player.tetromino[y][x]) {
        // if tetromino is not within max y (board height) or not within 0 and max x (board width)
        // and if the cell tetromino wants to move to is not empty
        if (
          !board[y + player.pos.y + moveY] ||
          !board[y + player.pos.y + moveY][x + player.pos.x + moveX] ||
          !board[y + player.pos.y + moveY][x + player.pos.x + moveX].isEmpty
        ) {
          return true;
        }
      }
    }
  }

  return false;
};

export { checkIfCollided };
