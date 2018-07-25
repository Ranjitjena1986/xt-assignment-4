import { createStore } from 'redux';
import { boardReducer } from '../reducer/board.reducer';

export const store = createStore(boardReducer);
