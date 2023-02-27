import { atom } from 'jotai';

import { createBoard, CreateBoardTypes } from '../utils';

const boardAtom = atom<CreateBoardTypes>(createBoard());

export { boardAtom };
