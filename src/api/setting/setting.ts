import { fetchGet, fetchPost } from '@/utils/request'

export interface SettingData {
  disableRegister: boolean
}

export type KunSettingResponse = KUNGalgameResponseData<SettingData>

export interface UpdateRKunSettingPayload {
  disableRegister: boolean
}

export const getKunSettingApi = async (): Promise<KunSettingResponse> => {
  const url = `/setting/register`
  return await fetchGet<KunSettingResponse>(url)
}

export const updateKunSettingApi = async (
  payload: UpdateRKunSettingPayload
) => {
  const url = `/setting/register`
  return await fetchPost(url, payload)
}
