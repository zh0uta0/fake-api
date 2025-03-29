import { request } from './request'
import { type ResNoId, type ResSchema } from '@/types/model'

// 创建
export const create = async (data: ResNoId) => {
  return request.post('/res', formatContent(data))
}
// 修改
export const update = async (data: ResSchema) => {
  return request.put(`/res/${data.id}`, formatContent(data))
}
// 删除
export const remove = async (id: number) => {
  return request.delete(`/res/${id}`)
}

function formatContent(data: ResSchema | ResNoId) {
  let { content, ...others } = data
  content = JSON.parse(content)
  return { content, ...others }
}
