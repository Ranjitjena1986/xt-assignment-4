import { store } from "../store/store";

export class BoardService {
    
    getBoards() {
        return window.boardObj;
    }

    addBoard(boardName) {
        window.boardObj['' + boardName] = {};
        this.saveInStorage();
    }

    deleteBoard(id) {
        delete window.boardObj['' + id];
        this.saveInStorage();
        
    }

    updateBoard(id,boardName) {
        let data = window.boardObj['' + id];
        window.boardObj['' + boardName] = {};
        window.boardObj['' + boardName] = data;  
        this.deleteBoard(id);   
        this.saveInStorage();
    }

    saveInStorage(){
        localStorage.setItem("board", JSON.stringify(window.boardObj));  
    }   

}