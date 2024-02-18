import axios from 'axios'

const BASE_URL = import.meta.env.VITE_KUN_ADMIN_URL

export const kunAxios = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
})

kunAxios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return error
  }
)

kunAxios.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // return login
    }
    return Promise.reject(error)
  }
)
