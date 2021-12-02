import request from '../plugins/umi-request'

export const queryHome = async params => request.get(`/api/home`, {params: params}) // 首页男生数据
export const queryHomeFemale = async params => request.get(`/api/homeFemale`, {params: params}) // 首页女生数据
export const querySearch = async params => request.get(`/api/search`, {params: params}) // 搜索页数据
export const queryRank = async params => request.get(`/api/rank`, {params: params}) // 排行榜男生数据
export const queryRankFemale = async params => request.get(`/api/rankFemale`, {params: params}) // 排行榜女生数据
export const queryFree = async params => request.get(`/api/free`, {params: params}) // 免费男生数据
export const queryFreeFemale = async params => request.get(`/api/freeFemale`, {params: params}) // 免费女生数据
export const queryFinish = async params => request.get(`/api/finish`, {params: params}) // 免费男生数据
export const queryFinishFemale = async params => request.get(`/api/finishFemale`, {params: params}) // 免费女生数据
export const queryDashen = async params => request.get(`/api/dashen`, {params: params}) // 大神男生数据
export const queryDashenFemale = async params => request.get(`/api/dashenFemale`, {params: params}) // 大神女生数据

export const queryAuth = async params => request.get(`/api/auths`, {params: params}) // 所有作者数据

export const queryDashenAll = async isMale => Promise.all([
  isMale ? queryDashen() : queryDashenFemale(),
  queryAuth({
    level: '白金',
    fenlei: isMale ? '男生' : '女生',
    _limit: 4,
    _page: 1,
  }),
  queryAuth({
    level: '大神',
    fenlei: isMale ? '男生' : '女生',
    _limit: 20,
    _page: 1,
  }),
])
