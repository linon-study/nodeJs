import * as fetch from './fetch';

export const doLoginUtil =(data,options={})=>{ //登录接口
	const url=`/user/login`
	return fetch.post(url,data,options);
}

export const getUserListUtil =(data,options={})=>{ //登录接口
	const url=`/user/getUserNameList`
	return fetch.get(url,data,options);
}