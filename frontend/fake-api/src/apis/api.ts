import type { Api, ApiCreate, ApiSchema } from '@/types/model'
import axios from 'axios'

const BaseURL = 'http://localhost:9468'
const request = axios.create({
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

export const getApis = async () => {
  const res = await request.get('/api')
  return res.data.reverse() as any as Promise<Api[]>
}

export const createApi = async (api: ApiCreate) => {
  const res = await request.post('/api', api)

  return res.data as Promise<Api>
}

export const updateApi = async (schema: ApiSchema) => {
  const { id, ...api } = schema
  const res = await request.put(`/api/${id}`, api)
  console.log('🚀 ~ updateApi ~ res:', res)

  return res.data as Promise<Api>
}

export const deleteApi = async (id: number) => {
  const { data } = await request.delete(`/api/${id}`)
  console.log('🚀 ~ deleteApi ~ data:', data)
  return data
}

export const getById = async (id: number) => {
  const { data } = await request.get(`/api/${id}`)
  return data as Promise<ApiSchema>
}
