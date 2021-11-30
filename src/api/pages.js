import request from '../plugins/umi-request'

export const queryHome = async params => request.get(`/api/home`, {params: params}) // 首页男生数据
export const queryHomeFemale = async params => request.get(`/api/homeFemale`, {params: params}) // 首页女生数据
export const querySearch = async params => request.get(`/api/search`, {params: params}) // 搜索页数据
