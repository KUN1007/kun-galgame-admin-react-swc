import { FC } from 'react'
import { Input, DatePicker, Flex, Button } from 'antd'
import type { DatePickerProps } from 'antd'

const { TextArea } = Input

const UpdateLogPage: FC = () => {
  const onChange: DatePickerProps['onChange'] = (date, dateString) => {
    console.log(date, dateString)
  }

  return (
    <>
      <h2>创建更新记录</h2>

      <TextArea
        className="mb-4"
        rows={4}
        placeholder="maxLength is 6"
        maxLength={6}
      />

      <Flex>
        <DatePicker onChange={onChange} placeholder="更新日期" />
        <Input className="mx-4" placeholder="更新版本" />
        <Button type="primary">确定发布更新</Button>
      </Flex>
    </>
  )
}

export default UpdateLogPage
