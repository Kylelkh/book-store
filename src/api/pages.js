import request from '../plugins/umi-request'

export const queryHome = async params => request.get(`/api/home`, {params: params})
