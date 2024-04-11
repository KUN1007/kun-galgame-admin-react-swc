import { fetchGet, serializeQueryParams, fetchPost } from '@/utils/request'
import type {
  ReportListResponse,
  ReportListParams,
  UpdateReportStatusPayload
} from './types'

export const getReportList = async (
  params: ReportListParams
): Promise<ReportListResponse> => {
  const url = `/report/list?${serializeQueryParams(params)}`
  return await fetchGet<ReportListResponse>(url)
}

export const updateReportStatus = async (
  payload: UpdateReportStatusPayload
) => {
  const url = `/report/status`
  return await fetchPost(url, payload)
}
