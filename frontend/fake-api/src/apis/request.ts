import type { Api, ApiCreate, ApiSchema } from '@/types/model'
import axios from 'axios'

const BaseURL = 'http://localhost:9468'
export const request = axios.create({
  baseURL: BaseURL,
})

request.interceptors.response.use(
  (response) => {
    if (response.status === 200) return response.data
    return response
  },
  (error) => {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error)
  },
)
