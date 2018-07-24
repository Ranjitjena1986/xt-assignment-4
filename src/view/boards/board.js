export const getBoard = (key,boardObj) => {
   return `<div class=" col-12 col-md-3 mr-1 mt-1 py-2 btn-primary ">
    <div class="row">
        <div onclick="loadList('${boardObj[key].id}')" class="col-8 pointer">${boardObj[key].boardname}</div>
        <div onclick="editList('${boardObj[key].id}','${boardObj[key].boardname}')" class="col-2 pointer"><i class="far fa-edit"></i></div>
        <button type="button" class="col-2 close" data-dismiss="alert" aria-label="Close" onclick="deleteBoard('${boardObj[key].id}')">
            <span aria-hidden="true">&times;</span>
        </button>
    </div>                 
    </div>`;
};