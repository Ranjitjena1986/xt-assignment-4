import { store } from '../store/store';

export class BoardService {
  getBoards() {
    return store.getState();
  }

  addBoard(boardName) {
    const obj = {};
    obj[boardName] = {};
    store.dispatch({ type: 'ADD_BOARD', obj });
  }

  deleteBoard(id) {
    const obj = store.getState();
    delete obj[`${id}`];
    store.dispatch({ type: 'DELETE_BOARD', obj });
  }

  updateBoard(id, boardName) {
    const obj = store.getState();
    const data = obj[`${id}`];
    obj[`${boardName}`] = {};
    obj[`${boardName}`] = data;
    delete obj[`${id}`];
    store.dispatch({ type: 'UPDATE_BOARD', obj });
  }

  setData(boards) {
    localStorage.setItem('board', JSON.stringify(boards));
  }

  getData() {
    return localStorage.getItem('board');
  }
}
