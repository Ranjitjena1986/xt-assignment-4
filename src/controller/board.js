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
                let obj = {
                    "boardname": boardName
                };                
                if(this.currentKey !==""){                    
                    this.boardService.updateBoard(this.currentKey,obj)
                    .then(res => {
                        this.loadBoards();
                    }), error => {
                        console.log(error);
                    };
                    this.currentKey = "";
                    this.jQuery('#loginModal').modal('hide');
                }else{
                    this.boardService.addBoard(obj)
                    .then(res => {
                        window.location = "./board.html?boardid=" + res.id;
                    }), error => {
                        console.log(error);
                    };
                }
            } else {
                this.jQuery("#boardHelp").html(boardName + ' board already exist,try another name!');
                this.jQuery("#boardHelp").removeClass("d-none");
            }
        }
    }

    loadBoards() {
        let boards = "";
        this.jQuery('#boards').html('');
        let board = this.boardService.getBoards('');
        board.then(res => {
            for (let key in res) {
                boards += getBoard(key, res);
            }
            boards += `<div class="col-md-3 mr-1 mt-1 py-2 board-color" onclick="getBoardObj()">Add Board</div>`;
            this.jQuery('#boards').html(boards);
        }), error => {
            console.log(error);
        };
    }

    deleteBoard(id) {
        this.boardService.deleteBoard(id)
            .then(res => {
                this.loadBoards();
            }), error => {
                console.log(error);
            };
    }

    editList(id,value) {
        this.currentKey = id;
        this.openBoardWindow();
        this.jQuery('#boardname').val(value);
    }

    cleanMemory() {
        this.currentKey = "";
    }
}