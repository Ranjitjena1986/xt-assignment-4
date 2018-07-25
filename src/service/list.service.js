import { store } from '../store/store';

export class ListService {
  addList(boardId, listname) {
    const obj = store.getState();
    obj[`${boardId}`][`${listname}`] = {};
    store.dispatch({ type: 'ADD_LIST', obj });
  }

  deleteList(boardId, listId) {
    const obj = store.getState();
    delete obj[`${boardId}`][`${listId}`];
    store.dispatch({ type: 'DELETE_LIST', obj });
  }

  updateList(boardId, listId, listName) {
    const boardObj = store.getState();
    const data = boardObj[`${boardId}`][`${listId}`];
    boardObj[`${boardId}`][`${listName}`] = {};
    boardObj[`${boardId}`][`${listName}`] = data;
    delete boardObj[`${boardId}`][`${listId}`];
    store.dispatch({ type: 'UPDATE_LIST', boardObj });
  }
}
