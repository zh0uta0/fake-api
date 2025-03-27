export type Api = {
  id: number
  url: string
  method: string
  alias: string
  editMod: boolean
  temp?: boolean
}

export type ApiCreate = Omit<Api, 'id' | 'temp' | 'editMod'>
