import { message } from 'antd'

interface ErrorResponseData {
  code: number
  message: string
}

export const errorHandler = async (response: Response) => {
  if (response.status === 401) {
    window.history.pushState(null, '', '/login')
    location.reload()
    return
  }

  const data: ErrorResponseData = await response.json()
  message.error(data.message)
}
