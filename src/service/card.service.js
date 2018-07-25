import { store } from "../store/store";

export class CardService {

    addCard(boardId,listID, cardName) {
        let obj = store.getState();
        obj['' + boardId]['' + listID][''+cardName] = {};
        store.dispatch({ type: 'ADD_CARD', obj });
    }
   

    updateCard(boardId, listId, oldCard,cardName) {
        let boardObj = store.getState();
        let data = boardObj['' + boardId]['' +listId]['' + oldCard];
        boardObj['' + boardId]['' + listId]['' + cardName] = {};
        boardObj['' + boardId]['' + listId]['' + cardName] = data;
        delete boardObj['' + boardId]['' +listId]['' + oldCard];

        store.dispatch({ type: 'UPDATE_CARD', boardObj });
    }   
    
    dragdropUpdate(boardId,dropDataList,dragList,dragCard){
        let boardObj = store.getState();
        boardObj[''+boardId][''+dropDataList][''+dragCard] = {};
        delete boardObj[''+boardId][''+dragList][''+dragCard];
        store.dispatch({ type: 'DRAG_DROP_CARD', boardObj });
    }
}