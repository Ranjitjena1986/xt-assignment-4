export const getBoard = keys => `<div class=" col-12 col-md-3 mr-1 mt-1 py-2 btn-primary ">
    <div class="row">
        <div onclick="loadList('${keys}')" class="col-8 pointer">${keys}</div>
        <div onclick="editList('${keys}')" class="col-2 pointer"><i class="far fa-edit"></i></div>
        <button type="button" class="col-2 close" data-dismiss="alert" aria-label="Close" onclick="deleteBoard('${keys}')">
            <span aria-hidden="true">&times;</span>
        </button>
    </div>                 
    </div>`;
