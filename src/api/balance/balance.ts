import { fetchDelete, fetchGet, fetchPost, fetchPut } from '@/utils/request'

export interface Balance {
  bid: number
  reason: {
    'en-us': string
    'ja-jp': string
    'zh-cn': string
    'zh-tw': string
  }
  type: boolean
  time: number
  amount: number
  status: number
}

export type CreateBalanceRequestData = Omit<Balance, 'bid'>

type GetBalanceResponseData = KUNGalgameResponseData<Balance[]>
type UpdateBalanceResponseData = KUNGalgameResponseData<null>
type EmptyBalanceResponseData = KUNGalgameResponseData<null>

export const getBalanceApi = async (
  type: number,
  start: number,
  end: number,
  min: number,
  max: number
): Promise<GetBalanceResponseData> => {
  const url = `/balance?type=${type}&start=${start}&end=${end}&min=${min}&max=${max}&page=0&limit=0`
  const response = fetchGet<GetBalanceResponseData>(url)
  return response
}

export const getBalanceLimitApi = async (
  page: number,
  limit: number
): Promise<GetBalanceResponseData> => {
  const url = `/balance?page=${page}&limit=${limit}&type=0&start=0&end=0&min=0&max=0`
  const response = fetchGet<GetBalanceResponseData>(url)
  return response
}

export const createBalanceApi = async (
  data: CreateBalanceRequestData
): Promise<UpdateBalanceResponseData> => {
  const url = '/balance'
  const response = fetchPost<UpdateBalanceResponseData>(url, data)
  return response
}

export const deleteBalanceApi = async (
  bid: number
): Promise<EmptyBalanceResponseData> => {
  const url = `/balance/${bid}`
  const response = fetchDelete<EmptyBalanceResponseData>(url)
  return response
}

export const updateBalanceApi = async (
  data: Balance
): Promise<EmptyBalanceResponseData> => {
  const url = `/balance/${data.bid}`
  const request = {
    ...data,
    type: data.type ? 'income' : 'expenditure'
  }

  const response = fetchPut<EmptyBalanceResponseData>(url, request)
  return response
}
