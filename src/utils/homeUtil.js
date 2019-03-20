import * as fetch from './fetch';

export const doLoginUtil =(data,options={})=>{ //登录接口
	const url=`/users/login`
	return fetch.post(url,data,options);
}

export const getUserListUtil =(data,options={})=>{ //登录接口
	const url=`/users/getUserList`
	return fetch.get(url,data,options);
}