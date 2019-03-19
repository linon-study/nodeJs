import * as types from '../constants/ActionTypes';

const initialState = {
  messageDetails: {}
};

const homeReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.TO_DO_LIST:
      return Object.assign({}, state, {
        todoList: action.todoList
      });
    default:
      return state;
  }
}

export default homeReducer