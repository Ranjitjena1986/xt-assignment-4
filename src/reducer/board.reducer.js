export const boardReducer = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_BOARD':
      return Object.assign({}, state, action.obj);
    case 'DELETE_BOARD':
      return Object.assign({}, action.obj);
    case 'UPDATE_BOARD':
      return Object.assign({}, action.obj);
    case 'INTIALIZE_BOARD':
      return action.boardObj;
    case 'ADD_LIST':
      return Object.assign({}, action.obj);
    case 'DELETE_LIST':
      return Object.assign({}, action.obj);
    case 'UPDATE_LIST':
      return Object.assign({}, action.boardObj);
    case 'ADD_CARD':
      return Object.assign({}, action.obj);
    case 'UPDATE_CARD':
      return Object.assign({}, action.boardObj);
    case 'DRAG_DROP_CARD':
      return Object.assign({}, action.boardObj);
    default:
      return state;
  }
};
