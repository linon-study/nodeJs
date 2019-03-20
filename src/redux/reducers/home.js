import * as types from '../constants/ActionTypes';

const initialState = {
  userList: {}
};

const homeReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_USER_LIST:
      return Object.assign({}, state, {
        userList: action.userList
      });
    default:
      return state;
  }
}

export default homeReducer