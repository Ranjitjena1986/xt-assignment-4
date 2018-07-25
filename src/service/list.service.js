import { store } from "../store/store";

export class ListService {

    addList(boardId, listname) {
        let obj = store.getState();
        obj['' + boardId]['' + listname] = {};
        store.dispatch({ type: 'ADD_LIST', obj });
    }

    deleteList(boardId, listId) {
        let obj = store.getState();
        delete obj['' + boardId]['' + listId];
        store.dispatch({ type: 'DELETE_LIST', obj });
    }

    updateList(boardId, listId, listName) {
        let boardObj = store.getState();
        let data = boardObj['' + boardId]['' + listId];
        boardObj['' + boardId]['' + listName] = {};
        boardObj['' + boardId]['' + listName] = data;
        delete boardObj['' + boardId]['' + listId];
        store.dispatch({ type: 'UPDATE_LIST', boardObj });
    }    
}