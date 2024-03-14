import { FC, useEffect, useState } from 'react'
import { getTodosApi, createTodoApi } from '@/api/update-log/updateLog'
import { Input, Button, List, Flex } from 'antd'
import type { Todo } from '@/api/update-log/updateLog'

const TodoList: FC = () => {
  const [enTodo, setEnTodo] = useState<string>('')
  const [zhTodo, setZhTodo] = useState<string>('')
  const [todos, setTodos] = useState<Todo[]>([])

  const handleAddTodo = async () => {
    if (enTodo.trim() !== '' && zhTodo.trim() !== '') {
      await createTodoApi(enTodo, 'en-us')
      await createTodoApi(zhTodo, 'zh-cn')
      setEnTodo('')
      setZhTodo('')
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
      <Flex className="w-full">
        <Flex vertical className="w-full">
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
            className="mb-4"
            required
          />
        </Flex>

        <Button type="primary" onClick={handleAddTodo} className="ml-4">
          创建新待办
        </Button>
      </Flex>

      <List
        bordered
        dataSource={todos}
        renderItem={(todo) => (
          <List.Item
            actions={[
              <Button
                key={todo.todoId}
                onClick={() => handleDeleteTodo(todo.todoId)}
              >
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
    </>
  )
}

export default TodoList
