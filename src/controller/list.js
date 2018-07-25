import { getLists } from '../view/boards/list/list';
import { ListService } from '../service/list.service';
import { BoardService } from '../service/board.service';
import { CardService } from '../service/card.service';


export class List {
  constructor(jQuery, path) {
    this.jQuery = jQuery;
    this.path = path;
    this.oldListName = '';
    this.oldCardName = '';
    this.listService = new ListService();
    this.boardService = new BoardService();
    this.cardService = new CardService();
  }

  addList() {
    this.jQuery('#listid').addClass('d-none');
    this.jQuery('#addlist').removeClass('d-none');
  }

  closeList() {
    this.jQuery('#addlist').addClass('d-none');
    this.jQuery('#listid').removeClass('d-none');
  }

  saveList() {
    let listtitle = '';
    if (this.oldListName === '') {
      listtitle = this.jQuery('#listtitle').val();
    } else {
      listtitle = this.jQuery(`#editlist-${this.oldListName}`).val();
    }

    if (listtitle === '' || listtitle === 'undefined') {
      this.jQuery('#listHelp').html('Please enter list title.');
      this.jQuery('#listHelp').removeClass('d-none');
    } else {
      const boardObj = this.boardService.getBoards();
      const objKeys = Object.keys(boardObj[`${this.path}`]);
      if (objKeys.indexOf(listtitle) === -1) {
        this.jQuery('#listtitle').val('');
        this.jQuery('#listHelp').addClass('d-none');
        this.closeList();
        if (this.oldListName !== '') {
          this.listService.updateList(this.path, this.oldListName, listtitle);
          this.cancelList();
          this.oldListName = '';
        } else {
          this.listService.addList(this.path, listtitle);
        }
      } else {
        this.jQuery('#listHelp').html(`${listtitle} list title already exist,try another title!`);
        this.jQuery('#listHelp').removeClass('d-none');
      }
    }
  }

  addCard(key) {
    this.jQuery(`#add-card-${key}`).addClass('d-none');
    this.jQuery(`#card-composer-${key}`).removeClass('d-none');
  }

  closeCard(key) {
    this.jQuery(`#add-card-${key}`).removeClass('d-none');
    this.jQuery(`#card-composer-${key}`).addClass('d-none');
  }

  saveCard(key) {
    let card = '';
    if (this.oldCardName === '') {
      card = this.jQuery(`#card-text-${key}`).val();
    } else {
      card = this.jQuery(`#edit-card-text-${this.oldCardName}`).val();
    }

    if (card === '' || card === 'undefined') {
      this.jQuery(`#cardHelp-${key}`).html('Please enter card.');
      this.jQuery(`#cardHelp-${key}`).removeClass('d-none');
    } else {
      const boardObj = this.boardService.getBoards();
      const objKeys = Object.keys(boardObj[`${this.path}`][`${key}`]);
      if (objKeys.indexOf(card) === -1) {
        this.jQuery(`#card-text-${key}`).val('');
        this.closeCard(key);
        this.jQuery(`#cardHelp-${key}`).addClass('d-none');
        if (this.oldCardName === '') {
          this.cardService.addCard(this.path, key, card);
        } else {
          this.cardService.updateCard(this.path, key, this.oldCardName, card);
          this.cleanCard(this.oldCardName);
          this.oldCardName = '';
        }
      } else {
        this.jQuery(`#cardHelp-${key}`).html(`${card} already exist,try another title!`);
        this.jQuery(`#cardHelp-${key}`).removeClass('d-none');
      }
    }
  }


  createLists(boards) {
    console.log(boards);
    let lists = '';
    for (const keys of Object.keys(boards[`${this.path}`])) {
      const keyid = keys.replace(' ', '-');
      lists += getLists(this.path, keys, keyid, boards);
    }
    this.jQuery('#listboard').html(lists);
  }

  editBoardList(key) {
    this.jQuery(`#editlist-${key}`).val(key);
    this.oldListName = key;
    this.jQuery(`#boardlist-${key}`).addClass('d-none');
    this.jQuery(`#editboardlist-${key}`).removeClass('d-none');
  }

  cancelList() {
    this.jQuery(`#boardlist-${this.oldListName}`).removeClass('d-none');
    this.jQuery(`#editboardlist-${this.oldListName}`).addClass('d-none');
    this.jQuery(`#editlist-${this.oldListName}`).val('');
    this.oldListName = '';
  }

  deleteList(key) {
    this.listService.deleteList(this.path, key);
  }

  editCard(cardkey) {
    this.jQuery(`#card-${cardkey}`).addClass('d-none');
    this.jQuery(`#edit-card-${cardkey}`).removeClass('d-none');
    this.jQuery(`#edit-card-text-${cardkey}`).val(cardkey);
    this.oldCardName = cardkey;
  }

  cleanCard(cardkey) {
    this.jQuery(`#card-${cardkey}`).removeClass('d-none');
    this.jQuery(`#edit-card-${cardkey}`).addClass('d-none');
    this.jQuery(`#edit-card-text-${cardkey}`).val('');
    this.oldCardName = '';
  }

  dragdrop(dropid, dragid) {
    const dropDataList = document.getElementById(dropid).getAttribute('data-list');
    const dragList = document.getElementById(dragid).getAttribute('data-list');
    const dragCard = document.getElementById(dragid).getAttribute('data-card');
    this.cardService.dragdropUpdate(this.path, dropDataList, dragList, dragCard);
  }
}
