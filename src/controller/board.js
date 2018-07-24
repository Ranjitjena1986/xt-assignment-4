import { getBoard } from "../view/boards/board";
import { BoardService } from "../service/board.service";


export class Board {

    constructor(jQuery) {
        this.jQuery = jQuery;
        this.currentKey = "";
        this.boardService = new BoardService();        
    }
   

    openBoardWindow() {
        this.jQuery("#loginModal").modal();
        this.jQuery('#boardname').val('');
        this.jQuery("#boardHelp").addClass("d-none");
    }

    addBoard() {
        let boardName = '' + this.jQuery('#boardname').val();
        if (boardName === '' || boardName === 'undefined') {
            this.jQuery("#boardHelp").html('Please enter board name.');
            this.jQuery("#boardHelp").removeClass("d-none");
        } else {
            let objKeys = Object.keys(window.boardObj);
            if (objKeys.indexOf(boardName) === -1) {
                this.jQuery('#boardname').val('');
                this.jQuery("#boardHelp").addClass("d-none");
                if(this.currentKey !==""){                    
                    this.boardService.updateBoard(this.currentKey, boardName);
                    this.currentKey = "";
                }else{
                    this.boardService.addBoard(boardName);
                }                
                window.location = "./board.html?boardname=" + boardName;
            } else {
                this.jQuery("#boardHelp").html(boardName + ' board already exist,try another name!');
                this.jQuery("#boardHelp").removeClass("d-none");
            }
        }
    }

    loadBoards() {
        let boardHtml = "";
        this.jQuery('#boards').html('');    
        for (let keys of Object.keys(window.boardObj)) {
            boardHtml += getBoard(keys);
        }
        boardHtml += `<div class="col-md-3 mr-1 mt-1 py-2 board-color" onclick="getBoardObj()">Add Board</div>`;
        this.jQuery('#boards').html(boardHtml);
    }

    deleteBoard(id){
        //delete window.boardObj[''+key];
        //localStorage.setItem("board", JSON.stringify(window.boardObj));
        this.boardService.deleteBoard(id);
        //this.loadBoards();
    }   

    editList(key){
        this.currentKey = key;
        this.openBoardWindow();
        this.jQuery('#boardname').val(key);
    }

    cleanMemory(){
        this.currentKey = ""; 
    }
}