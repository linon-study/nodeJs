import 'es6-promise'; 
import fetch from 'isomorphic-fetch';

const checkStatus=(response)=>{
	switch(response.status){
    case 200:    
		return response;
    case 409:    
		return response;
    case 400:    
		return response;
    case 302:    
        window.location.href='/';
        return {};
    default:
        return response;
    }
}

const parseJSON=(response)=>{
    console.log(response)
	return response.json();
}

export const get = (url,options) => {  
  const defaultOpt={
     method: 'get',
     headers: {
         'Accept': 'application/json', 
         'Content-Type': 'application/json'  
     },
     credentials: 'same-origin',
     timeout:1000*300
 }
 return fetch(url,defaultOpt).then(checkStatus).then(parseJSON);
}; 

export const post = (url,data={},options) => {  
 const defaultOpt={
    method: 'post',
 headers: {
     'Accept': 'application/json', 
     'Content-Type': 'application/json'  
 },
     credentials: 'same-origin',
     timeout:1000*600,
 body:JSON.stringify(data)
 }
 return fetch(url,defaultOpt).then(checkStatus).then(parseJSON);
}; 
