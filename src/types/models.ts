export type HttpMethod = "get" | "post" | "put" | "patch" | "delete";

export type Res = {
  id: number;
  content: any;
  alias?: string;
  apiId: number;
  enable: boolean;
};

export type ResNoId = Omit<Res, "id">;
export type ResOrfo = Omit<Res, "id" | "apiId">;
export type ResUpdate = Partial<Res> & { id: number };

export type ApiSchema = {
  url: string;
  method: HttpMethod;
};

export type Api = {
  id: number;
  url: string;
  method: HttpMethod;
  alias?: string;
  responses: ResNoId[];
};

export type ApiNoId = Omit<Api, "id">;
export type ApiNoRes = Omit<Api, "responses">;
export type ApiNoIdRes = Omit<Api, "id" | "responses">;
export type ApiUpdate = Partial<ApiNoIdRes> & { id: number };

export type RouteSchema = {
  url: string;
  method: HttpMethod;
};
