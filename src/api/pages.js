import request from '../plugins/umi-request'

export const queryHome = async params => request.get(`/api/home`, {params: params})
export const queryHomeFemale = async params => request.get(`/api/homeFemale`, {params: params})
