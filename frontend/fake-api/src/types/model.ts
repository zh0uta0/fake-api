export type ResSchema = {
  id: number
  apiId: number
  content: any
  alias: string
  enable: boolean
}

export type ResNoId = Omit<ResSchema, 'id'>

export type ApiSchema = {
  id: number
  url: string
  method: string
  alias: string
  responses?: ResSchema[]
}

export type ApiNoRes = Omit<ApiSchema, 'responses'>

export interface Api extends ApiSchema {
  editMod: boolean
  temp?: boolean
}

export type ApiCreate = Omit<Api, 'id' | 'temp' | 'editMod'>

export type ElThemeType = 'success' | 'primary' | 'warning' | 'danger'
