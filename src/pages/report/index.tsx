import { getReportList, updateReportStatus } from '@/api/report/report'
import { useEffect, useMemo, useState } from 'react'
import useSWRImmutable from 'swr/immutable'
import { Table, Select, Typography, Space, message } from 'antd'
import { useSearchParams } from 'react-router-dom'
import {
  FilterReportType,
  FilterStatus,
  filterStatusOptions,
  operatorOptions,
  operatorStatusMap,
  filterReportTypeOptions
} from './constant'
import dayjs from 'dayjs'

import type { Status } from '@/api/report/types'
import type { URLSearchParamsInit } from 'react-router-dom'
import type { Report } from '@/api/report/types'

const { Column } = Table

const ReportPage = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [messageApi, contextHolder] = message.useMessage()

  const [reportType, setReportType] = useState<FilterReportType>(
    () => (searchParams.get('type') ?? 'all') as FilterReportType
  )
  const [status, setStatus] = useState<FilterStatus>(() => {
    const status = searchParams.get('status')
    if (status !== null && status !== 'all') {
      return Number(status) as FilterStatus
    }
    return 'all'
  })
  const [pageSize, setPageSize] = useState(
    () => Number(searchParams.get('ps')) ?? 15
  )
  const [pageNumber, setPageNumber] = useState(
    () => Number(searchParams.get('pn')) ?? 1
  )

  const {
    data: resData,
    isLoading,
    mutate
  } = useSWRImmutable(
    ['/report/list', status, reportType, pageNumber, pageSize],
    () =>
      getReportList({
        status: status === 'all' ? undefined : status,
        type: reportType === 'all' ? undefined : reportType,
        pn: pageNumber,
        ps: pageSize
      })
  )

  const list = useMemo(
    () =>
      resData?.data?.list.map<Report>((item) => {
        return {
          ...item,
          created: dayjs(item.created).format('YYYY-MM-DD HH:mm:ss'),
          updated: dayjs(item.updated).format('YYYY-MM-DD HH:mm:ss')
        }
      }),
    [resData]
  )

  useEffect(() => {
    setSearchParams({
      type: reportType,
      status,
      pn: pageNumber,
      ps: pageSize
    } as unknown as URLSearchParamsInit)
  }, [pageNumber, pageSize, reportType, setSearchParams, status])

  const updateStatus = async (id: number, status: Status) => {
    await updateReportStatus({
      id,
      status
    })
    mutate()
    messageApi.open({
      type: 'success',
      content: '操作成功'
    })
  }

  return (
    <>
      {contextHolder}
      <Space className='mb-4' size='middle'>
        <Space>
          <Typography className='font-bold'>状态：</Typography>
          <Select
            options={filterStatusOptions}
            defaultValue={status}
            onChange={setStatus}
            style={{ width: '120px' }}
          />
        </Space>
        <Space>
          <Typography className='font-bold'>举报类型：</Typography>
          <Select
            options={filterReportTypeOptions}
            defaultValue={reportType}
            onChange={setReportType}
            style={{ width: '120px' }}
          />
        </Space>
      </Space>
      <Table
        loading={isLoading}
        dataSource={list}
        rowKey='report_id'
        pagination={{
          current: pageNumber,
          pageSize: pageSize,
          total: resData?.data?.total,
          onChange: setPageNumber,
          onShowSizeChange: (_, ps) => setPageSize(ps)
        }}>
        <Column title='ID' dataIndex='report_id' width={40} />
        <Column title='举报类型' dataIndex='type' width={120} />
        <Column title='原因' dataIndex='reason' />
        <Column title='创建时间' dataIndex='created' width={160} />
        <Column title='更新时间' dataIndex='updated' width={160} />
        <Column
          title='状态'
          dataIndex='status'
          width={120}
          render={(status: Status, record: Report) => (
            <Select
              options={operatorOptions}
              style={{ width: '120px' }}
              defaultValue={operatorStatusMap[status].value}
              onChange={(value) => updateStatus(record.report_id, value)}
            />
          )}
        />
      </Table>
    </>
  )
}

export default ReportPage
