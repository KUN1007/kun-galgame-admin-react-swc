import { FC, useEffect, useState } from 'react'
import {
  getTodosApi,
  createTodoApi,
  updateTodoApi,
} from '@/api/update-log/updateLog'
import { List, Flex, Button, Modal, Input, message, Radio, Divider } from 'antd'
import type { Todo, UpdateTodoRequestData } from '@/api/update-log/updateLog'

const { TextArea } = Input

const getStatus = (status: number) => {
  if (status === 0) {
    return '未开始'
  } else if (status === 1) {
    return '进行中'
  } else if (status === 2) {
    return '已完成'
  } else {
    return ''
  }
}

const TodoList: FC = () => {
  const [messageApi, contextHolder] = message.useMessage()

  const [open, setOpen] = useState(false)

  const [todo, setTodo] = useState<UpdateTodoRequestData>({
    todoId: 0,
    status: 0,
    content: '',
  })
  const [enTodo, setEnTodo] = useState<string>('')
  const [zhTodo, setZhTodo] = useState<string>('')
  const [status, setStatus] = useState<number>(0)
  const [todos, setTodos] = useState<Todo[]>([])

  const handleAddTodo = async () => {
    if (enTodo.trim() !== '' && zhTodo.trim() !== '') {
      await createTodoApi({ content: enTodo, status, language: 'en-us' })
      await createTodoApi({ content: zhTodo, status, language: 'zh-cn' })
      setEnTodo('')
      setZhTodo('')

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

  const handleDeleteTodo = (index: number) => {
    const newTodos = todos.filter((_, i) => i !== index)
    setTodos(newTodos)
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
          value={enTodo}
          onChange={(event) => setEnTodo(event.target.value)}
          placeholder="English"
          className="mb-4"
          required
        />
        <Input
          value={zhTodo}
          onChange={(event) => setZhTodo(event.target.value)}
          placeholder="中文版"
          className="mb-4 ml-4"
          required
        />
      </Flex>

      <Flex justify="space-between">
        <Radio.Group
          onChange={(event) => setStatus(event.target.value)}
          defaultValue={status.toString()}
        >
          <Radio.Button value="0">未开始</Radio.Button>
          <Radio.Button value="1">进行中</Radio.Button>
          <Radio.Button value="2">已完成</Radio.Button>
        </Radio.Group>
        <Button type="primary" onClick={handleAddTodo} className="mb-4">
          创建新待办
        </Button>
      </Flex>

      <Divider>待办列表</Divider>

      <List
        bordered
        dataSource={todos}
        renderItem={(todo) => (
          <List.Item
            actions={[
              <span key={todo.todoId}>{`ID: ${todo.todoId}`}</span>,
              <span key={todo.todoId}>{getStatus(todo.status)}</span>,
              <Button key={todo.todoId} onClick={() => handleUpdateTodo(todo)}>
                编辑
              </Button>,
              <Button
                key={todo.todoId}
                danger
                onClick={() => handleDeleteTodo(todo.todoId)}
              >
                删除
              </Button>,
            ]}
          >
            {todo.content}
          </List.Item>
        )}
      />

      <Modal
        title="重新编辑待办"
        open={open}
        onOk={handleEditConfirm}
        onCancel={() => setOpen(false)}
      >
        <TextArea
          showCount
          value={todo.content}
          onChange={(event) =>
            setTodo({ ...todo, content: event.target.value })
          }
          className="h-32 mb-4"
        />
        <Radio.Group
          onChange={(event) =>
            setTodo({ ...todo, status: parseInt(event.target.value) })
          }
          defaultValue={todo.status.toString()}
        >
          <Radio.Button value="0">未开始</Radio.Button>
          <Radio.Button value="1">进行中</Radio.Button>
          <Radio.Button value="2">已完成</Radio.Button>
        </Radio.Group>
      </Modal>
    </>
  )
}

export default TodoList
