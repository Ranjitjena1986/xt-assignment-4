import { getLists } from '../view/boards/list/list';
import { getCardList } from '../view/boards/list/cardlist';
import { BoardService } from "../service/board.service";
import { ListService } from '../service/list.service';


export class List {
    
    constructor(jQuery, path) {
        this.jQuery = jQuery;
        this.path = path;
        this.oldListName = "";
        this.oldCardName = "";
        this.boardService = new BoardService();
        this.listService = new ListService();
        this.boardService.getBoards(path).then(res=>{
            jQuery("#boardtitle").html(res.boardname);
        }),error=> {
            console.log(error);
        };
       
    }

    addList() {
        this.jQuery("#listid").addClass('d-none');
        this.jQuery("#addlist").removeClass('d-none');
    }

    closeList() {
        this.jQuery("#addlist").addClass('d-none');
        this.jQuery("#listid").removeClass('d-none');
    }

    saveList() {
        let listtitle = '';
        if(this.oldListName===""){
            listtitle = this.jQuery('#listtitle').val();
        }else{
            listtitle = this.jQuery('#editlist-'+this.oldListName).val();
        }
        
        if (listtitle === '' || listtitle === 'undefined') {
            this.jQuery("#listHelp").html('Please enter list title.');
            this.jQuery("#listHelp").removeClass("d-none");
        } else {
            let objKeys = Object.keys(window.boardObj['' + this.path]);
            if (objKeys.indexOf(listtitle) === -1) {
                this.jQuery('#listtitle').val('');
                this.jQuery("#listHelp").addClass("d-none");
                this.closeList();
                if(this.oldListName!==""){
                    let data = window.boardObj['' + this.path][''+this.oldListName];
                    window.boardObj['' + this.path]['' + listtitle] = {};
                    window.boardObj['' + this.path]['' + listtitle] =data;
                    delete window.boardObj['' + this.path][''+this.oldListName];
                    this.cancelList();
                    this.oldListName = "";
                }else{
                    window.boardObj['' + this.path]['' + listtitle] = {};
                }
                localStorage.setItem("board", JSON.stringify(window.boardObj));
            } else {
                this.jQuery("#listHelp").html(listtitle + ' list title already exist,try another title!');
                this.jQuery("#listHelp").removeClass("d-none");
            }
        }
        this.createLists();
    }

    addCard(key) {
        this.jQuery("#add-card-" + key).addClass('d-none');
        this.jQuery("#card-composer-" + key).removeClass('d-none');
    }

    closeCard(key) {
        this.jQuery("#add-card-" + key).removeClass('d-none');
        this.jQuery("#card-composer-" + key).addClass('d-none');
    }

    saveCard(key) {
        let card = '';         
        if(this.oldCardName===''){
            card = this.jQuery('#card-text-' + key).val();
        }else{
            card = this.jQuery('#edit-card-text-'+this.oldCardName).val();
        }

        if (card === '' || card === 'undefined') {
            this.jQuery("#cardHelp-" + key).html('Please enter card.');
            this.jQuery("#cardHelp-" + key).removeClass("d-none");
        } else {
            var objKeys = Object.keys(window.boardObj['' + this.path]['' + key]);
            if (objKeys.indexOf(card) === -1) {
                this.jQuery('#card-text-' + key).val('');
                this.closeCard(key)
                this.jQuery("#cardHelp-" + key).addClass("d-none");
                if(this.oldCardName===''){
                    window.boardObj['' + this.path]['' + key]['' + card] = {};
                }else{
                    let data = window.boardObj['' + this.path]['' +key]['' + this.oldCardName];
                    window.boardObj['' + this.path]['' + key]['' + card] = {};
                    window.boardObj['' + this.path]['' + key]['' + card] = data;
                    delete window.boardObj['' + this.path]['' +key]['' + this.oldCardName];
                    cleanCard(this.oldCardName);
                    this.oldCardName = "";
                }
                localStorage.setItem("board", JSON.stringify(window.boardObj));
            } else {
                this.jQuery("#cardHelp-" + key).html(card + ' already exist,try another title!');
                this.jQuery("#cardHelp-" + key).removeClass("d-none");
            }
        }
        this.createCards(card, key);
    }

    createCards(id, list) {
        let cards = getCardList(this.path,list);
        let listid = list.replace(" ", "-");
        if (id === '') {
            return cards;
        } else {
            this.jQuery('#cards-' + listid).html(cards);
        }
    }

    createLists() {
        this.listService.getList(this.path)
        .then(res=>{

        }),error => {

        };
        let lists = "";
        for (let keys of Object.keys(window.boardObj['' + this.path])) {
            let keyid = keys.replace(" ","-");
            lists += getLists(this.path, keys, keyid);
        }        
        this.jQuery('#listboard').html(lists);
    }
    
    editBoardList(key){
        this.jQuery('#editlist-'+key).val(key);
        this.oldListName = key;
        this.jQuery("#boardlist-"+key).addClass('d-none');
        this.jQuery("#editboardlist-"+key).removeClass('d-none');
    }

    cancelList(){        
        this.jQuery("#boardlist-"+this.oldListName).removeClass('d-none');
        this.jQuery("#editboardlist-"+this.oldListName).addClass('d-none');
        this.jQuery('#editlist-'+this.oldListName).val('');
        this.oldListName = "";
    }

    deleteList(key){
        delete window.boardObj['' + this.path]['' + key];
        localStorage.setItem("board", JSON.stringify(window.boardObj));
        this.createLists();
    }

    editCard(cardkey){
        this.jQuery("#card-"+cardkey).addClass('d-none');
        this.jQuery("#edit-card-"+cardkey). removeClass('d-none');
        this.jQuery('#edit-card-text-'+cardkey).val(cardkey);
        this.oldCardName = cardkey;
    }

    cleanCard(cardkey){
        this.jQuery("#card-"+cardkey).removeClass('d-none');
        this.jQuery("#edit-card-"+cardkey).addClass('d-none');
        this.jQuery('#edit-card-text-'+cardkey).val('');
        this.oldCardName = "";
    }

    dragdrop(dropid, dragid){
        let dropDataList = document.getElementById(dropid).getAttribute('data-list');
        let dragList = document.getElementById(dragid).getAttribute('data-list');
        let dragCard = document.getElementById(dragid).getAttribute('data-card');
        
        window.boardObj[''+this.path][''+dropDataList][''+dragCard] = {};
        delete window.boardObj[''+this.path][''+dragList][''+dragCard];
        
        localStorage.setItem("board", JSON.stringify(window.boardObj));
        this.createLists();
    }
}