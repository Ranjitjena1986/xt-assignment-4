import { store } from '../store/store';

export class CardService {
  constructor() {
    this.obj = '';
  }

  addCard(boardId, listID, cardName) {
    this.obj = store.getState();
    const obj = this.obj[`${boardId}`][`${listID}`][`${cardName}`] = {};
    store.dispatch({ type: 'ADD_CARD', obj });
  }


  updateCard(boardId, listId, oldCard, cardName) {
    this.obj = store.getState();
    const boardObj = this.obj;
    const data = boardObj[`${boardId}`][`${listId}`][`${oldCard}`];
    boardObj[`${boardId}`][`${listId}`][`${cardName}`] = {};
    boardObj[`${boardId}`][`${listId}`][`${cardName}`] = data;
    delete boardObj[`${boardId}`][`${listId}`][`${oldCard}`];

    store.dispatch({ type: 'UPDATE_CARD', boardObj });
  }

  dragdropUpdate(boardId, dropDataList, dragList, dragCard) {
    this.obj = store.getState();
    const boardObj = this.obj;
    boardObj[`${boardId}`][`${dropDataList}`][`${dragCard}`] = {};
    delete boardObj[`${boardId}`][`${dragList}`][`${dragCard}`];
    store.dispatch({ type: 'DRAG_DROP_CARD', boardObj });
  }
}
