import { fetchDelete, fetchGet, fetchPut, fetchPost } from '@/utils/request'

export interface NonMoeResponseData {
  nid: number
  uid: number
  name: string
  description: KunLanguage
  time: number
  result: string | number
}

export type NonMoeRequestData = Omit<NonMoeResponseData, 'nid'>

type SelectNonMoeResponseData = KUNGalgameResponseData<NonMoeResponseData[]>
type EmptyNonMoeResponseData = KUNGalgameResponseData<null>

export const createNonMoeRecord = async (
  data: NonMoeRequestData
): Promise<EmptyNonMoeResponseData> => {
  const url = '/non-moe'
  const response = await fetchPost<EmptyNonMoeResponseData>(url, data)
  return response
}

export const getAllNonMoeRecords =
  async (): Promise<SelectNonMoeResponseData> => {
    const url = '/non-moe'
    const response = await fetchGet<SelectNonMoeResponseData>(url)
    return response
  }

export const getNonMoeRecordByUid = async (
  uid: number
): Promise<SelectNonMoeResponseData> => {
  const url = `/non-moe/${uid}`
  const response = await fetchGet<SelectNonMoeResponseData>(url)
  return response
}

export const updateNonMoeRecord = async (
  nid: number,
  data: NonMoeRequestData
): Promise<EmptyNonMoeResponseData> => {
  const url = `/non-moe/${nid}`
  const response = await fetchPut<EmptyNonMoeResponseData>(url, data)
  return response
}

export const withdrawNonMoeRecord = async (
  nid: number
): Promise<EmptyNonMoeResponseData> => {
  const url = `/non-moe/${nid}`
  const response = await fetchDelete<EmptyNonMoeResponseData>(url)
  return response
}
