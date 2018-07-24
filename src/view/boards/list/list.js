import { getCardList } from "./cardlist";

export const getLists = (path, keys, keyid) => {
    let cards = getCardList(path, keys);
    return `<div class="col-12 col-md-3 list py-2 mr-3 mt-3">
    <div class="list-header col-12 pl-0 pr-0" id="header-${keys}">
        <div class="row" id="boardlist-${keys}">
            <h4 class="col-8">${keys}</h4>
            <div class="col-2 pointer pull-right pt-2" onclick="editBoardList('${keys}')"><i class="far fa-edit"></i></div>
            <button type="button" class="col-1 close" data-dismiss="alert" aria-label="Close" onclick="deleteList('${keys}')">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="row d-none" id="editboardlist-${keys}">
            <div class="col-8"><input type="text" class="form-control" id="editlist-${keys}" aria-describedby="editlist-${keys}" placeholder="Enter List title" data-toggle="tooltip"
            data-placement="right" title="Enter List title"></div>
            <span class="col-2 pt-2" onclick="saveList()"> <i class="fas fa-save"></i></span>                    
            <button type="button" class="close pt-0" data-dismiss="alert" aria-label="Close" onclick="cancelList()">
                <span aria-hidden="true">&times;</span>
            </button>

        </div>
    </div>
    <div class="col-12 pl-0 pr-0 listofcards" type="list" id="cards-${keyid}" data-list="${keys}" ondrop="drop(event)" ondragover="allowDrop(event)">
        ${cards}
    </div>
    <div class="col-12 pl-0 pr-0">
        <div id="card-composer-${keys}" class="col-12 pl-0 d-none">
            <textarea class="form-control" id="card-text-${keys}" rows="2"></textarea>
            <small id="cardHelp-${keys}" class="form-text text-danger d-none"></small>
            <button type="button" class="btn btn-primary mt-1" id="savecard" onclick="saveCard('${keys}')">Add Card</button>
            <button type="button" class="close pt-2" data-dismiss="alert" aria-label="Close" onclick="closeCard('${keys}')">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div id="add-card-${keys}" class="addcard py-1 px-1" onclick="addCard('${keys}')">
            + Add Card
        </div>
    </div>
</div>`;
};