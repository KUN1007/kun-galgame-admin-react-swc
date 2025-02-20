import { FC, useEffect, useState } from 'react'
import { Switch, message } from 'antd'
import { getKunSettingApi, updateKunSettingApi } from '@/api/setting/setting'

const TopicPage: FC = () => {
  const [messageApi, contextHolder] = message.useMessage()

  const [disableRegister, setDisableRegister] = useState(false)

  const getSetting = async () => {
    const response = await getKunSettingApi()
    setDisableRegister(response.data.disableRegister)
  }

  useEffect(() => {
    getSetting()
  }, [])

  const updateKunSetting = async (checked: boolean) => {
    await updateKunSettingApi({ disableRegister: checked })
    messageApi.open({
      type: 'success',
      content: disableRegister ? '启用注册成功' : '禁用注册成功'
    })
  }

  return (
    <>
      {contextHolder}
      <div>
        <h2>禁止注册</h2>
        <div className='flex justify-between'>
          <span>是否开启禁止注册</span>
          <Switch
            checked={disableRegister}
            checkedChildren='开启'
            unCheckedChildren='关闭'
            defaultChecked={disableRegister}
            onChange={async (checked) => {
              await updateKunSetting(checked)
              setDisableRegister(checked)
            }}
          />
        </div>
      </div>
    </>
  )
}

export default TopicPage
