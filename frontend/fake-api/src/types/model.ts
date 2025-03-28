export type ResSchema = {
  id: number
  apiId: number
  content: any
  alias: string
  enable: boolean
}

export type ApiSchema = {
  id: number
  url: string
  method: string
  alias: string
  responses?: ResSchema[]
}

export interface Api extends ApiSchema {
  editMod: boolean
  temp?: boolean
}

export type ApiCreate = Omit<Api, 'id' | 'temp' | 'editMod'>
