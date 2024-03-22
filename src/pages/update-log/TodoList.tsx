import { FC, useEffect, useState } from 'react'
import {
  getTodosApi,
  createTodoApi,
  updateTodoApi,
  deleteTodoApi,
} from '@/api/update-log/updateLog'
import {
  List,
  Flex,
  Button,
  Modal,
  Input,
  message,
  Radio,
  Divider,
  Popconfirm,
} from 'antd'
import dayjs from 'dayjs'
import type { Todo, UpdateTodoRequestData } from '@/api/update-log/updateLog'

const { TextArea } = Input

const getStatus = (status: number) => {
  if (status === 0) {
    return '待处理'
  } else if (status === 1) {
    return '进行中'
  } else if (status === 2) {
    return '已完成'
  } else if (status === 3) {
    return '已废弃'
  } else {
    return ''
  }
}

const TodoList: FC = () => {
  const [messageApi, contextHolder] = message.useMessage()

  const [open, setOpen] = useState(false)
  const [todo, setTodo] = useState<UpdateTodoRequestData>({
    todoId: 0,
    contentEn: '',
    contentZh: '',
    status: 0,
  })
  const [todos, setTodos] = useState<Todo[]>([])

  const handleAddTodo = async () => {
    if (todo.contentEn.trim() !== '' && todo.contentZh.trim() !== '') {
      await createTodoApi(todo)
      setTodo({
        todoId: 0,
        contentEn: '',
        contentZh: '',
        status: 0,
      })

      await getTodos()
      messageApi.open({
        type: 'success',
        content: '创建待办成功',
      })
    }
  }

  const handleUpdateTodo = async (value: Todo) => {
    setTodo({ ...value })
    setOpen(true)
  }

  const handleEditConfirm = async () => {
    const res = await updateTodoApi(todo)
    if (res.code === 200) {
      messageApi.open({
        type: 'success',
        content: '待办编辑成功',
      })
      await getTodos()
      setOpen(false)
    }
  }

  const confirmDelete = async (todoId: number) => {
    await deleteTodoApi(todoId)
    messageApi.open({
      type: 'success',
      content: '删除待办成功',
    })
    await getTodos()
  }

  const getTodos = async () => {
    const res = await getTodosApi(1, 10)
    setTodos(res.data)
  }

  useEffect(() => {
    getTodos()
  }, [])

  return (
    <>
      {contextHolder}
      <Flex className="w-full">
        <Input
          onChange={(event) =>
            setTodo({ ...todo, contentEn: event.target.value })
          }
          placeholder="English"
          className="mb-4"
          required
        />
        <Input
          onChange={(event) =>
            setTodo({ ...todo, contentZh: event.target.value })
          }
          placeholder="中文版"
          className="mb-4 ml-4"
          required
        />
      </Flex>

      <Flex justify="space-between">
        <Radio.Group
          onChange={(event) =>
            setTodo({ ...todo, status: parseInt(event.target.value) })
          }
          defaultValue={todo.status.toString()}
        >
          <Radio.Button value="0">未开始</Radio.Button>
          <Radio.Button value="1">进行中</Radio.Button>
          <Radio.Button value="2">已完成</Radio.Button>
          <Radio.Button value="3">已废弃</Radio.Button>
        </Radio.Group>
        <Button type="primary" onClick={handleAddTodo} className="mb-4">
          创建新待办
        </Button>
      </Flex>

      <Divider>待办列表</Divider>

      <List
        bordered
        dataSource={todos}
        pagination={{
          defaultPageSize: 3,
          defaultCurrent: 1,
          total: todos?.length,
        }}
        renderItem={(todo) => (
          <List.Item
            actions={[
              <span key={todo.todoId}>{`ID: ${todo.todoId}`}</span>,
              <span key={todo.todoId}>{getStatus(todo.status)}</span>,
              <Button key={todo.todoId} onClick={() => handleUpdateTodo(todo)}>
                编辑
              </Button>,
              <Popconfirm
                key={todo.todoId}
                title="删除待办"
                description={`确定删除 ${todo.contentZh} 吗`}
                onConfirm={() => confirmDelete(todo.todoId)}
                okText="Yes"
                cancelText="No"
              >
                <Button danger>删除</Button>
              </Popconfirm>,
            ]}
          >
            <Flex vertical>
              {todo.status === 2 && (
                <p className="text-green-600">{`完成于: ${dayjs(
                  todo.completedTime
                ).format('MM-D-YYYY - HH:mm:ss')}`}</p>
              )}
              <p>{todo.contentEn}</p>
              <p>{todo.contentZh}</p>
            </Flex>
          </List.Item>
        )}
      />

      <Modal
        title="重新编辑待办"
        open={open}
        onOk={handleEditConfirm}
        onCancel={() => setOpen(false)}
      >
        <h3>English</h3>
        <TextArea
          showCount
          value={todo.contentEn}
          onChange={(event) =>
            setTodo({ ...todo, contentEn: event.target.value })
          }
          className="h-32 mb-4"
        />
        <h3>简体中文</h3>
        <TextArea
          showCount
          value={todo.contentZh}
          onChange={(event) =>
            setTodo({ ...todo, contentZh: event.target.value })
          }
          className="h-32 mb-4"
        />
        <Radio.Group
          onChange={(event) =>
            setTodo({ ...todo, status: parseInt(event.target.value) })
          }
          value={todo.status.toString()}
          defaultValue={todo.status.toString()}
        >
          <Radio.Button value="0">未开始</Radio.Button>
          <Radio.Button value="1">进行中</Radio.Button>
          <Radio.Button value="2">已完成</Radio.Button>
          <Radio.Button value="3">已废弃</Radio.Button>
        </Radio.Group>
      </Modal>
    </>
  )
}

export default TodoList
