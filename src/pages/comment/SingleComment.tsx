import { List, Avatar } from 'antd'
import type { Comment } from '@/api/comment/comment'

function SingleComment({
  commentList,
}: {
  commentList: Comment[] | undefined
}) {
  if (!commentList) {
    return null
  }

  return (
    <List
      itemLayout="horizontal"
      dataSource={commentList}
      className="pr-4 overflow-y-scroll max-h-60"
      renderItem={(comment) => (
        <List.Item>
          <List.Item.Meta
            avatar={
              comment.c_user.avatar ? (
                <Avatar src={comment.c_user.avatar} />
              ) : (
                <Avatar className="text-white bg-blue-500">
                  {comment.c_user.name[0].toUpperCase()}
                </Avatar>
              )
            }
            title={
              <a
                href={`https://www.kungal.com/topic/${comment.tid}`}
                target="_blank"
              >
                {`${comment.c_user.name} => ${comment.to_user.name}`}
              </a>
            }
            description={comment.content}
          />
          <span>cid: {comment.cid}</span>
        </List.Item>
      )}
    />
  )
}

export default SingleComment
