export type ReportType =
  | 'topic'
  | 'reply'
  | 'comment'
  | 'user'
  | 'galgame'
  | 'galgameComment'

export type Status = 0 | 1 | 2

export interface ReportListParams {
  pn?: number
  ps?: number
  status?: Status
  type?: ReportType
}

export interface ReportListData {
  list: Report[]
  pn: number
  ps: number
  total: number
}

export interface Report {
  reason: string
  type: string
  status: Status
  created: string
  updated: string
  report_id: number
}

export type ReportListResponse = KUNGalgameResponseData<ReportListData>

export interface UpdateReportStatusPayload {
  id: number
  status: Status
}
