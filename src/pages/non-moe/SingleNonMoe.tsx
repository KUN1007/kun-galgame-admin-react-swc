import { FC, useState } from 'react'
import {
  List,
  Modal,
  message,
  Button,
  Flex,
  Input,
  InputNumber,
  Select,
  DatePicker,
  DatePickerProps
} from 'antd'
import dayjs from 'dayjs'
import { withdrawNonMoeRecord, updateNonMoeRecord } from '@/api/non-moe/non-moe'
import type {
  NonMoeResponseData,
  NonMoeRequestData
} from '@/api/non-moe/non-moe'
import TextArea from 'antd/es/input/TextArea'
import { resultOptions, resultMap, resultMapReverse } from './category'
import { checkUserByUid, checkUserByUsername } from './check-user'

type NonMoeProps = {
  nonMoeList: NonMoeResponseData[] | undefined
  reload: () => Promise<void>
}

export const SingleNonMoe: FC<NonMoeProps> = ({ nonMoeList, reload }) => {
  const [messageApi, contextHolder] = message.useMessage()

  const [open, setOpen] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)
  const [nonMoe, setNonMoe] = useState<NonMoeResponseData>({
    nid: 0,
    uid: 0,
    name: '',
    description_en_us: '',
    description_zh_cn: '',
    time: 0,
    result: ''
  })
  const [resultType, setResultType] = useState<number>(0)

  const changeResultType = (value: number) => {
    if (value === 0) nonMoe.result = 0
    setResultType(value)
  }

  const handleEditInit = (record: NonMoeResponseData) => {
    setNonMoe(record)
    if (typeof record.result === 'string') {
      setResultType(resultMapReverse.get(record.result) || 0)
    }
    setOpen(true)
  }

  const handleWithDraw = (nid: number, name: string) => {
    const nonMoeInfo: NonMoeResponseData = {
      nid,
      uid: 0,
      name,
      description_en_us: '',
      description_zh_cn: '',
      time: 0,
      result: ''
    }
    setNonMoe(nonMoeInfo)
    setOpenDelete(true)
  }

  const handleEditConfirm = async () => {
    if (
      nonMoe.uid === 0 ||
      nonMoe.name.trim() === '' ||
      nonMoe.description_en_us.trim() === '' ||
      nonMoe.description_zh_cn.trim() === '' ||
      nonMoe.time === 0 ||
      (resultType === 0 && (nonMoe.result === '' || nonMoe.result === null))
    ) {
      messageApi.open({
        type: 'error',
        content: '请填写完整的不萌记录信息'
      })
      return
    }

    if (
      !(await checkUserByUid(nonMoe.uid)) ||
      !(await checkUserByUsername(nonMoe.name))
    ) {
      messageApi.open({
        type: 'error',
        content: '用户不存在，请检查输入的 uid 或用户名'
      })
      return
    }

    const nonMoeData: NonMoeRequestData = {
      uid: nonMoe.uid,
      name: nonMoe.name,
      description_en_us: nonMoe.description_en_us,
      description_zh_cn: nonMoe.description_zh_cn,
      time: nonMoe.time,
      result:
        resultType === 0
          ? parseInt(nonMoe.result as string)
          : resultMap.get(resultType) || '未知的处罚结果'
    }
    const res = await updateNonMoeRecord(nonMoe.nid, nonMoeData)
    if (res.code === 200) {
      messageApi.open({
        type: 'success',
        content: '更新不萌记录成功'
      })
      setOpen(false)
      reload()
    }
  }

  const handleCancel = () => {
    setOpen(false)
    setNonMoe({
      nid: 0,
      uid: 0,
      name: '',
      description_en_us: '',
      description_zh_cn: '',
      time: 0,
      result: ''
    })
  }

  const pickDate: DatePickerProps['onChange'] = (_, dateString) => {
    setNonMoe({ ...nonMoe, time: dayjs(dateString as string).unix() })
  }

  const handleWithDrawConfirm = async () => {
    const res = await withdrawNonMoeRecord(nonMoe.nid)
    if (res.code === 200) {
      messageApi.open({
        type: 'success',
        content: '撤回不萌记录成功'
      })
      setOpenDelete(false)
      reload()
    }
  }

  return (
    <>
      {contextHolder}
      <List
        itemLayout='vertical'
        size='default'
        pagination={{
          defaultCurrent: 1,
          pageSize: 2,
          total: nonMoeList?.length
        }}
        dataSource={nonMoeList}
        renderItem={(record) => (
          <List.Item>
            <List.Item.Meta
              title={
                <Flex justify='space-between'>
                  <a
                    className='mr-4'
                    href={`https://www.kungal.com/kungalgamer/${record.uid}/info`}
                    target='_blank'>
                    {record.name}
                  </a>

                  <div>
                    <Button
                      type='default'
                      className='mx-4'
                      key='edit'
                      onClick={() => handleEditInit(record)}>
                      编辑处罚结果
                    </Button>

                    <Button
                      type='primary'
                      className='mx-4'
                      key='delete'
                      danger
                      onClick={() => handleWithDraw(record.nid, record.name)}>
                      撤回不萌处罚
                    </Button>
                  </div>
                </Flex>
              }
              description={
                typeof record.result === 'string'
                  ? `处罚结果：${record.result}`
                  : `处罚结果：萌萌点 - ${record.result}`
              }
            />
            {
              <Flex vertical>
                <span>中文描述: {record.description_zh_cn}</span>
                <span>英文描述: {record.description_en_us}</span>
              </Flex>
            }
            {
              <Flex justify='space-between'>
                <div className='flex gap-4'>
                  <span>NID: {record.nid}</span>
                  <span>UID: {record.uid}</span>
                </div>
                <span>
                  处罚时间:{' '}
                  {dayjs.unix(record.time).format('MM-D-YYYY - HH:mm:ss')}
                </span>
              </Flex>
            }
          </List.Item>
        )}
      />

      <Modal
        title='重新编辑处罚内容'
        open={open}
        onOk={handleEditConfirm}
        onCancel={handleCancel}>
        <Flex vertical className='my-5'>
          <h4 className='font-bold'>用户uid</h4>
          <InputNumber
            placeholder='用户uid'
            min={1}
            value={nonMoe.uid}
            onChange={(value) => setNonMoe({ ...nonMoe, uid: value || 0 })}
          />
        </Flex>

        <Flex vertical className='mb-5'>
          <h4 className='font-bold'>用户名</h4>
          <Input
            showCount
            value={nonMoe.name}
            maxLength={50}
            onChange={(event) =>
              setNonMoe({ ...nonMoe, name: event.target.value })
            }
          />
        </Flex>

        <Flex vertical className='mb-5'>
          <h4 className='font-bold'>处罚描述（中文）</h4>
          <TextArea
            showCount
            maxLength={1000}
            value={nonMoe.description_zh_cn}
            onChange={(event) =>
              setNonMoe({ ...nonMoe, description_zh_cn: event.target.value })
            }
          />
        </Flex>

        <Flex vertical className='mb-5'>
          <h4 className='font-bold'>处罚描述（英文）</h4>
          <TextArea
            showCount
            maxLength={1000}
            value={nonMoe.description_en_us}
            onChange={(event) =>
              setNonMoe({ ...nonMoe, description_en_us: event.target.value })
            }
          />
        </Flex>

        <Flex vertical className='mb-5'>
          <h4 className='font-bold'>处罚结果</h4>
          <Select
            value={resultType}
            onChange={changeResultType}
            options={resultOptions}
            className='w-64'
          />
          {resultType === 0 && (
            <InputNumber
              className='w-64'
              placeholder='请输入要扣除的萌萌点数'
              value={nonMoe.result}
              min={1}
              onChange={(value) => setNonMoe({ ...nonMoe, result: value || 0 })}
            />
          )}
        </Flex>

        <Flex vertical className='mb-5'>
          <h4 className='font-bold'>处罚日期</h4>
          <DatePicker
            value={nonMoe.time ? dayjs.unix(nonMoe.time) : undefined}
            onChange={pickDate}
            placeholder='处罚日期'
          />
        </Flex>
      </Modal>

      <Modal
        title={`撤回用户: ${reload.name}的不萌处罚：${nonMoe.nid}`}
        open={openDelete}
        onOk={handleWithDrawConfirm}
        onCancel={() => setOpenDelete(false)}>
        <h2 className='font-bold text-red-600'>
          您确定要撤回对该用户的该处罚吗？
        </h2>
        <p>撤回后，该用户的此不萌记录将被删除，且不可恢复！</p>
      </Modal>
    </>
  )
}
