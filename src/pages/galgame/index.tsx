import { FC, useState } from 'react'
import { Button, Flex, InputNumber, message } from 'antd'
import { getGalgameApi } from '@/api/galgame/galgame'
import { getPreferredLanguageText } from '@/utils/getPreferredLanguageText'
import { Resource } from './Resource'
import { Comment } from './Comment'
import type { InputNumberProps } from 'antd'
import type { Galgame } from '@/api/galgame/galgame'

const TopicPage: FC = () => {
  const [messageApi, contextHolder] = message.useMessage()

  const [gid, setGid] = useState(1)
  const [galgame, setGalgame] = useState<Galgame>()

  const onChange: InputNumberProps['onChange'] = (value) => {
    if (value) {
      setGid(Number(value))
    }
  }

  const onSearchGalgame = async () => {
    if (gid) {
      const response = await getGalgameApi(gid)
      setGalgame(response.data)
    } else {
      messageApi.open({
        type: 'error',
        content: '输入不可为空'
      })
    }
  }

  return (
    <>
      {contextHolder}
      <div>
        <h2>请输入 Galgame ID</h2>
        <p>这个 ID 在 Galgame 页面的 URL 中</p>
        <p>例如 https://www.kungal.com/zh-cn/galgame/1 的 ID 就为 1</p>

        <Flex className='mb-8'>
          <InputNumber value={gid} onChange={onChange} step={1} />
          <Button className='ml-4' onClick={onSearchGalgame}>
            确定
          </Button>
        </Flex>

        {galgame && (
          <>
            <h2 className='mb-4'>
              <a
                href={`https://www.kungal.com/galgame/${galgame.gid}`}
                target='_blank'>
                {getPreferredLanguageText(galgame.name, 'zh-cn')}
              </a>
            </h2>

            <h3>此 Galgame 下的资源链接</h3>
            <Resource
              resourceList={galgame.resources}
              reload={onSearchGalgame}
            />

            <h3>此 Galgame 下的评论</h3>
            <Comment commentList={galgame.comments} reload={onSearchGalgame} />
          </>
        )}
      </div>
    </>
  )
}

export default TopicPage
