import { fetchDelete, fetchGet, fetchPost, fetchPut } from '@/utils/request'

export interface Todo {
  todoId: number
  status: number
  content: KunLanguage
  time: number
  completedTime: number
}

export interface CreateTodoRequestData {
  content: KunLanguage
  status: number
}

export interface UpdateTodoRequestData {
  todoId: number
  content: KunLanguage
  status: number
}

export type UpdateType =
  | 'feat'
  | 'pref'
  | 'fix'
  | 'styles'
  | 'mod'
  | 'chore'
  | 'sec'
  | 'refactor'
  | 'docs'
  | 'test'

export interface UpdateLogRequestData {
  type: UpdateType
  content: KunLanguage
  time: string
  version: string
}

export type Language = 'en-us' | 'zh-cn'
export type GetTodosResponseData = KUNGalgameResponseData<Todo[]>
export type UpdateResponseData = KUNGalgameResponseData<null>

export const getTodosApi = async (
  page: number,
  limit: number
): Promise<GetTodosResponseData> => {
  const url = `/update/todo?page=${page}&limit=${limit}`
  const response = await fetchGet<GetTodosResponseData>(url)
  return response
}

export const createTodoApi = async (
  data: CreateTodoRequestData
): Promise<UpdateResponseData> => {
  const url = `/update/todo`
  const response = await fetchPost<UpdateResponseData>(url, data)
  return response
}

export const updateTodoApi = async (
  data: UpdateTodoRequestData
): Promise<UpdateResponseData> => {
  const url = `/update/todo`
  const response = await fetchPut<UpdateResponseData>(url, data)
  return response
}

export const deleteTodoApi = async (
  todoId: number
): Promise<UpdateResponseData> => {
  const url = `/update/todo?todoId=${todoId}`
  const response = await fetchDelete<UpdateResponseData>(url)
  return response
}

export const createUpdateLogApi = async (
  data: UpdateLogRequestData
): Promise<UpdateResponseData> => {
  const url = `/update/history`
  const response = await fetchPost<UpdateResponseData>(url, data)
  return response
}
