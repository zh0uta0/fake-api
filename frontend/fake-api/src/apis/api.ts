import type { Api, ApiCreate, ApiSchema, ResSchema } from '@/types/model'
import { request } from './request'

export const get = async (id: number) => {
  const { data } = await request.get<ApiSchema>(`/api/${id}`)
  // return data as Promise<ApiSchema>
  // (data as )
  if (data.responses) {
    data.responses = formatResContent(data.responses)
  }

  return data
}

export const getAll = async () => {
  const res = await request.get('/api')
  return res.data.reverse() as any as Promise<Api[]>
}

export const create = async (api: ApiCreate) => {
  const res = await request.post('/api', api)

  return res.data as Promise<Api>
}

export const update = async (schema: ApiSchema) => {
  const { id, ...api } = schema
  const res = await request.put(`/api/${id}`, api)
  console.log('🚀 ~ updateApi ~ res:', res)

  return res.data as Promise<Api>
}

export const remove = async (id: number) => {
  const { data } = await request.delete(`/api/${id}`)
  console.log('🚀 ~ deleteApi ~ data:', data)
  return data
}

function formatResContent(res: ResSchema[]) {
  return res.map((item) => {
    let { content, ...others } = item
    content = JSON.stringify(content)
    return { content, ...others }
  })
}
