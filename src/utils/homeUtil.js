import * as fetch from './fetch';

export const doLoginUtil =(data,options={})=>{ //登录接口
	const url=`http://localhost:3000/users/login`
	return fetch.post(url,data,options);
}