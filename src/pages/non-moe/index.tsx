import { FC, useCallback, useEffect, useState } from 'react'
import dayjs from 'dayjs'
import {
  Input,
  InputNumber,
  message,
  Flex,
  Divider,
  Button,
  DatePicker,
  Select
} from 'antd'
import {
  getNonMoeRecordByUid,
  getAllNonMoeRecords,
  createNonMoeRecord
} from '@/api/non-moe/non-moe'
import type {
  NonMoeRequestData,
  NonMoeResponseData
} from '@/api/non-moe/non-moe'
import { checkUserByUid, checkUserByUsername } from './check-user'
import { SingleNonMoe } from './SingleNonMoe'
import type { DatePickerProps } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import { resultOptions, resultMap } from './category'

const { Search } = Input

const NonMoePage: FC = () => {
  const [messageApi, contextHolder] = message.useMessage()

  const [uid, setUid] = useState('')
  const [nonMoe, setNonMoe] = useState<NonMoeResponseData>({
    nid: 0,
    uid: 0,
    name: '',
    description: {
      'en-us': '',
      'ja-jp': '',
      'zh-cn': ''
    },
    time: 0,
    result: ''
  })
  const [nonMoeList, setNonMoeList] = useState<NonMoeResponseData[]>([])
  const [resultType, setResultType] = useState<number>(0)

  const changeResultType = (value: number) => {
    if (value === 0) nonMoe.result = 0
    setResultType(value)
  }

  const pickDate: DatePickerProps['onChange'] = (_, dateString) => {
    setNonMoe({ ...nonMoe, time: dayjs(dateString as string).unix() })
  }

  const handlePublishNonMoe = async () => {
    if (
      nonMoe.uid === 0 ||
      nonMoe.name.trim() === '' ||
      nonMoe.description['en-us'].trim() === '' ||
      nonMoe.description['zh-cn'].trim() === '' ||
      nonMoe.time === 0 ||
      (resultType === 0 && nonMoe.result === '')
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
      description: nonMoe.description,
      time: nonMoe.time,
      result:
        resultType === 0
          ? parseInt(nonMoe.result as string)
          : resultMap.get(resultType) || '未知的处罚结果'
    }

    await createNonMoeRecord(nonMoeData)

    messageApi.open({
      type: 'success',
      content: '不萌记录发布成功'
    })

    setNonMoe({
      nid: 0,
      uid: 0,
      name: '',
      description: {
        'en-us': '',
        'ja-jp': '',
        'zh-cn': ''
      },
      time: 0,
      result: ''
    })
    onSearchNonMoe()
  }

  const onSearchNonMoe = useCallback(
    async (value?: string) => {
      if (!value) {
        const { data } = await getAllNonMoeRecords()
        setNonMoeList(data)
      } else {
        const userUid = parseInt(value)
        if (isNaN(userUid)) {
          messageApi.open({
            type: 'error',
            content: '请输入正确的用户 UID'
          })
        } else {
          const { data } = await getNonMoeRecordByUid(parseInt(value))
          setNonMoeList(data)
          if (data.length === 0) {
            messageApi.info('该用户目前没有不萌记录')
          } else {
            messageApi.success(`该用户目前总共有 ${data.length} 条不萌记录`)
          }
        }
      }
    },
    [messageApi]
  )

  useEffect(() => {
    onSearchNonMoe()
  }, [onSearchNonMoe])

  return (
    <>
      {contextHolder}
      <div
        className='overflow-y-scroll'
        style={{ maxHeight: 'calc(100dvh - 150px)' }}>
        <h2>根据用户uid进行查询</h2>
        <Search
          placeholder='请输入用户的 uid'
          value={uid}
          onChange={(event) => setUid(event.target.value)}
          onSearch={onSearchNonMoe}
          enterButton='确定'
          className='mb-8'
        />
        <Divider>记录列表</Divider>
        <SingleNonMoe
          nonMoeList={nonMoeList}
          reload={() => onSearchNonMoe(uid)}
        />

        <h2 className='mt-8'>新增不萌记录</h2>

        <Flex>
          <TextArea
            className='mb-4 mr-4'
            value={nonMoe.description['en-us']}
            onChange={(event) =>
              setNonMoe({
                ...nonMoe,
                description: {
                  ...nonMoe.description,
                  'en-us': event.target.value
                }
              })
            }
            rows={6}
            placeholder='Punishment description in English'
          />
          <TextArea
            className='mb-4'
            value={nonMoe.description['zh-cn']}
            onChange={(event) =>
              setNonMoe({
                ...nonMoe,
                description: {
                  ...nonMoe.description,
                  'zh-cn': event.target.value
                }
              })
            }
            rows={6}
            placeholder='处罚描述（中文版）'
          />
        </Flex>

        <Flex className='gap-5 mb-4'>
          <InputNumber
            className='w-32'
            placeholder='用户uid'
            min={1}
            value={nonMoe.uid}
            onChange={(value) => setNonMoe({ ...nonMoe, uid: value || 0 })}
          />
          <Input
            className='w-64'
            value={nonMoe.name}
            onChange={(event) =>
              setNonMoe({ ...nonMoe, name: event.target.value })
            }
            placeholder='用户名'
          />
          <Select
            className='w-64'
            value={resultType}
            onChange={changeResultType}
            options={resultOptions}
          />
          {resultType === 0 && (
            <InputNumber
              className='w-64'
              value={nonMoe.result}
              placeholder='请输入要扣除的萌萌点数'
              min={1}
              onChange={(value) => setNonMoe({ ...nonMoe, result: value || 0 })}
            />
          )}
          <DatePicker
            value={nonMoe.time ? dayjs.unix(nonMoe.time) : undefined}
            onChange={pickDate}
            placeholder='处罚日期'
          />
          <Button type='primary' onClick={handlePublishNonMoe}>
            确定发布处罚
          </Button>
        </Flex>

        {/* <Flex className='gap-5 mb-4'>
          <Select
            value={resultType}
            onChange={(value) => setResultType(value as number)}
            options={resultOptions}
            className='w-64'
          />
          {resultType === 0 && (
            <InputNumber
              className='w-64'
              value={nonMoe.result}
              placeholder='请输入要扣除的萌萌点数'
              min={1}
              onChange={(value) => setNonMoe({ ...nonMoe, result: value || 0 })}
            />
          )}
        </Flex> */}

        {/* <Flex className='gap-5'>
          <DatePicker
            value={nonMoe.time ? dayjs.unix(nonMoe.time) : undefined}
            onChange={pickDate}
            placeholder='处罚日期'
          />
          <Button type='primary' onClick={handlePublishNonMoe}>
            确定发布处罚
          </Button>
        </Flex> */}
      </div>
    </>
  )
}

export default NonMoePage
