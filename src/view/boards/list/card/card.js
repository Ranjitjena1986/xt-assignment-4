export const getCard = (key,keyid,list,listid) => {
    return `<div class="my-1 list-card px-1 py-1" id="drag-${keyid}-${listid}" data-list="${list}" data-card="${key}" draggable="true" ondragstart="drag(event)">
    <div id="card-${key}" class="row">
        <div class="col-9 card-head"  type="card" data-list="${list}" data-card="${key}" id="id-${listid}-${keyid}">
             ${key}
        </div>
        <div class="col-2" onclick="editCard('${key}')">
            <i class="far fa-edit"></i>
        </div>
        
    </div>  
    <div id="edit-card-${key}" class="row d-none">
        <div class="col-12">
            <textarea class="form-control" id="edit-card-text-${key}" rows="2"></textarea>
            <button type="button" class="btn btn-primary mt-1" id="savecard" onclick="saveCard('${list}')">Save Card</button>
            <button type="button" class="close pt-2" data-dismiss="alert" aria-label="Close" onclick="cleanCard('${key}')">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
    </div>              
</div>`;
};