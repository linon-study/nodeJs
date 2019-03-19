import { message } from 'antd';
import * as types from '../constants/ActionTypes';
import { doLoginUtil } from '../../utils/homeUtil';

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