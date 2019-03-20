import { message } from 'antd';
import * as types from '../constants/ActionTypes';
import { doLoginUtil, getUserListUtil } from '../../utils/homeUtil';

//增加
export function doLogin(parmas) {
  console.log('parmas......', parmas)
  return dispatch => {
    return doLoginUtil(parmas)
      .then(data => {
        if (data && data.code >= 300 && data.message) {
          message.error(data.message, 2)
        } else if (data && data.code == 200) {
          message.success("验证码发送成功，请注意查收", 2)
        }
      });
  };
}

//查询
export function getUserList(params) {
  console.log('params....', params);
  return dispatch => {
    return getUserListUtil(params)
      .then(data => {
        dispatch({
          type: types.GET_USER_LIST,
          userList: data
        })
      })
      .catch(err => {
        throw err;
      })
  }
}