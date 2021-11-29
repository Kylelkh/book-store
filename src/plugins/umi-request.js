import request from "umi-request";
import Cookie from "js-cookie";
import PubSub from 'pubsub-js'
import React from "react";

request.interceptors.request.use((url, options) => {
  console.log('请求')
  const token = Cookie.get('token');
  // 携带token
  token && (options.headers = {'token': token});
  options.useCache = true;
  // 开启加载状态
  PubSub.publish('uploadLoading', true);
  // console.log(true)
  return {
    url,
    options,
  };
})

request.interceptors.response.use(response => {
  console.log('响应')
  const codeMaps = {
    200: '服务器成功返回请求的数据。',
    201: '新建或修改数据成功。',
    202: '一个请求已经进入后台排队（异步任务）。',
    204: '删除数据成功。',
    400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
    401: '用户没有权限（令牌、用户名、密码错误）。',
    403: '用户得到授权，但是访问是被禁止的。',
    404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
    406: '请求的格式不可得。',
    410: '请求的资源被永久删除，且不会再得到的。',
    422: '当创建一个对象时，发生一个验证错误。',
    500: '服务器发生错误，请检查服务器。',
    502: '网关错误。',
    503: '服务不可用，服务器暂时过载或维护。',
    504: '网关超时。',
  };
  response.status === 200 || console.log('响应拦截', codeMaps[response.status]);
  // 加载状态结束
  PubSub.publish('updateLoading', false)
  // console.log(false)
  return response;
})

//request绑到对象包上
React.request = request;
// request绑定到Component类的原型   组件|this.request
React.Component.prototype.request = request;
export default request;
