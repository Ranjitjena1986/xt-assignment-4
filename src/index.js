import './styles/main.scss';

import jQuery from '../node_modules/jquery/dist/jquery';
import '../node_modules/jquery-ui/ui/widgets/sortable';
import '../node_modules/bootstrap/dist/js/bootstrap';

import { store } from './store/store';
import { Board } from './controller/board';
import { List } from './controller/list';

const getUrlParameter = (name) => {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};

const board = new Board(jQuery);
const path = getUrlParameter('boardname');
const list = new List(jQuery, path);
const pathname = window.location.pathname;

store.subscribe(() => {
    let boards = store.getState();
    board.setLocalData(boards);
    switch (pathname) {
        case '/':
            board.loadBoards(boards);
            break;
        case '/board.html':
            list.createLists(boards);
        break;
    }
});

let boardObj = JSON.parse(board.getLocalData()) || {};
store.dispatch({ type: 'INTIALIZE_BOARD', boardObj });

switch (pathname) {
    case '/':
        window.getBoardObj = () => {
            board.openBoardWindow();
        }

        document.querySelector('#addboard').addEventListener('click', () => {
            board.addBoard();
        });

        window.deleteBoard = (key) => {
            let result = confirm("Want to delete ?");
            if (result) {
                board.deleteBoard(key);
            }
        };

        window.loadList = (key) => {
            window.location = "./board.html?boardname=" + key;
        }

        window.editList = (key) => {
            board.editList(key);
        }

        jQuery('#loginModal').on('hidden.bs.modal', function (e) {
            board.cleanMemory();
        });
    break;
    case '/board.html':
        jQuery("#boardtitle").html(path);
        window.addList = () => {
            list.addList();
        }

        window.closeList = () => {
            list.closeList();
        }

        window.saveList = () => {
            list.saveList();
        }

        window.addCard = (key) => {
            list.addCard(key);
        }

        window.closeCard = (key) => {
            list.closeCard(key);
        }

        window.saveCard = (key) => {
            list.saveCard(key);
        }

        window.editBoardList = (key) => {
            list.editBoardList(key);
        }

        window.cancelList = () => {
            list.cancelList();
        }

        window.deleteList = (key) => {
            let result = confirm("Want to delete ?");
            if (result) {
                list.deleteList(key);
            }
        }

        window.editCard = (cardkey) => {
            list.editCard(cardkey);
        }

        window.cleanCard = (cardkey) => {
            list.cleanCard(cardkey);
        }
        jQuery("#listboard").sortable({
            connectWith: "#listboard",
            handle: ".list-header"
        });

        window.allowDrop = (ev) => {
            ev.preventDefault();
        }
        window.drag = (ev) => {
            ev.dataTransfer.setData("text", ev.target.id);
        }
        window.drop = (ev) => {
            ev.preventDefault();
            let data = ev.dataTransfer.getData("text");
            list.dragdrop(ev.target.id, data);
        }
        break;
    default:
        break;
}












