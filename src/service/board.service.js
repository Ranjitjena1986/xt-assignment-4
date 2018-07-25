import { store } from "../store/store";

export class BoardService {
    
    getBoards() {
        return store.getState();
    }

    addBoard(boardName) {
        let obj = {};
        obj[boardName] = {}; 
        store.dispatch({type: 'ADD_BOARD', obj});
    }

    deleteBoard(id) {
        let obj = store.getState();
        delete obj['' + id];    
        store.dispatch({type: 'DELETE_BOARD', obj});    
    }

    updateBoard(id,boardName) {
        let obj = store.getState();
        let data = obj['' + id];
        obj['' + boardName] = {};
        obj['' + boardName] = data;       
        delete obj['' + id];         
        store.dispatch({type: 'UPDATE_BOARD', obj});
    }

    setData(boards){
        localStorage.setItem("board", JSON.stringify(boards));
    }

    getData(){
        return localStorage.getItem("board");
    }
}