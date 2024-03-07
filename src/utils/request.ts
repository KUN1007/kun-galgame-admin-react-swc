import { errorHandler } from '@/error/errorHandler'
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'

export type FetchOptions = {
  method: HttpMethod
  credentials: 'include'
  headers?: Record<string, string>
  body?: BodyInit
}

// Request deduplication
const pendingRequests = new Map()

const kunFetchRequest = async <T>(
  url: string,
  options: FetchOptions
): Promise<T> => {
  const baseUrl = import.meta.env.VITE_KUN_ADMIN_URL
  const fullUrl = `${baseUrl}${url}`

  const userStore = JSON.parse(localStorage.getItem('KunAdminUserStore') || '')
    .state.user.token

  const headers = {
    ...options.headers,
    Authorization: `Bearer ${userStore}`,
  }

  const requestKey = JSON.stringify({ fullUrl, options })

  if (pendingRequests.has(requestKey)) {
    return pendingRequests.get(requestKey)
  }

  const fetchPromise = (async () => {
    try {
      const response = await fetch(fullUrl, { ...options, headers })

      if (response.status === 233 || !response.ok) {
        await errorHandler(response)
        throw new Error('Fetch data ERROR')
      }

      return response.json()
    } finally {
      pendingRequests.delete(requestKey)
    }
  })()

  pendingRequests.set(requestKey, fetchPromise)

  return fetchPromise
}

const fetchGet = async <T>(
  url: string,
  headers?: Record<string, string>
): Promise<T> => {
  const options: FetchOptions = {
    method: 'GET',
    credentials: 'include',
    headers: headers,
  }

  return await kunFetchRequest<T>(url, options)
}

const fetchPost = async <T>(
  url: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body?: Record<string, any>,
  headers?: Record<string, string>
): Promise<T> => {
  const options: FetchOptions = {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: JSON.stringify(body),
  }

  return await kunFetchRequest<T>(url, options)
}

const fetchPut = async <T>(
  url: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body?: Record<string, any>,
  headers?: Record<string, string>
): Promise<T> => {
  const options: FetchOptions = {
    method: 'PUT',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: JSON.stringify(body),
  }

  return await kunFetchRequest<T>(url, options)
}

const fetchDelete = async <T>(
  url: string,
  headers?: Record<string, string>
): Promise<T> => {
  const options: FetchOptions = {
    method: 'DELETE',
    credentials: 'include',
    headers: headers,
  }

  return await kunFetchRequest<T>(url, options)
}

const fetchPostWithFormData = async <T>(
  url: string,
  formData: FormData,
  headers?: Record<string, string>
): Promise<T> => {
  const options: FetchOptions = {
    method: 'POST',
    credentials: 'include',
    headers: {
      ...headers,
    },
    body: formData,
  }

  return await kunFetchRequest<T>(url, options)
}

export { fetchGet, fetchPost, fetchPut, fetchDelete, fetchPostWithFormData }
