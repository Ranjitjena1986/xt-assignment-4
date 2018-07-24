export const boardReducer = (state={}, action) => {
    switch (action.type) {
        case 'ADD_BOARD':
            return {};
        case 'DELETE_BOARD':
            return {};
        case 'UPDATE_BOARD':
            return {};
        case 'INTIALIZE_BOARD':        
            return action.boardObj; 
        default:
            return state;
    }
}