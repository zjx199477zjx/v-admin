import axios from 'axios';
import {
  Loading,
  Message,
  MessageBox
} from 'element-ui';
import store from './store/index';
import router from './router/index';
import Constants from './Constants';
import { Base64 } from 'js-base64';
import { sessionStorage } from 'src/assets/js/storage';

if (!store.state.token) {
  store.commit('SET_TOKEN', sessionStorage.getItem('token'));
}


function extendJson(params) {
  var defaultParam = Constants.defaultParam || sessionStorage.getItem('info');
  for (let i in defaultParam) {
    if (!params[i]) params[i] = defaultParam[i];
  }
  return params;
}
// console.log(Base64)
// axios 配置 准备拦截器
const http = axios.create({
  baseURL: 'http://www.siheal.cn:8086/',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  },
  transformRequest: [function (data, headers) {    
      if (!data.skip) data = extendJson(data);
      data = Base64.encode(JSON.stringify(data));
      headers.token = store.state.token;
    if (headers['Content-type'] === 'multipart/form-data') {
      return data;
    } else {
      return data;
      // return JSON.stringify(data);
    }
  }]
});


var loadingInstance;

// 请求拦截器
http.interceptors.request.use(config => {
  loadingInstance = Loading.service({
    fullscreen: true,
    lock: true,
    text: '正在请求数据...'
  });
  
  // 开发环境下，如果请求是 post,put,patch,则打印数据体，方便调试
  if (process.env.NODE_ENV === 'development') {
    const { method } = config;
    if (method === 'post' || method === 'put' || method === 'patch') {
      console.log(config.data);
    }
  }
  
  return config;
}, error => {
  loadingInstance.close();
  Message.error({
    message: '请求失败'
  });
  return Promise.reject(error);
});

// 响应拦截器
http.interceptors.response.use(res => {
  loadingInstance.close();
  const jsonData = JSON.parse(Base64.decode(res.data));
  return jsonData;
}, error => {
  loadingInstance.close();
  if (error && error.response) {
    console.log(error.response);
    
    switch (error.response.status) {
      // 401 token失效
      case 401:
        MessageBox.alert('身份信息已过期，请重新登陆', '提示', {
          confirmButtonText: '重新登陆',
          showClose: false,
          type: 'error',
          callback: action => {
            router.replace({
              path: '/login',
              query: {
                redirect: router.currentRoute.fullPath
              }
            });
          }
        });
        break;
      
      // 403 服务器拒绝访问
      case 403:
        router.push('/error/403');
        break;
      
      // 404 访问的资源不存在
      case 404:
        router.push('/error/404');
        break;
      
      // 500 服务器错误
      case 500:
        router.push('/error/500');
        break;
    }
    
    return Promise.reject(error);
  }
});

export default http;
