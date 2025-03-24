type HttpMethod = "get" | "post" | "put" | "patch" | "delete";

type Res = {
  id: number;
  content: any;
  alias: string;
  apiId: number;
};

type ResNoId = Omit<Res, "id">;
type ResOrfo = Omit<Res, "id" | "apiId">;
type ResUpdate = Partial<Res> & { id: number };

type Api = {
  id: number;
  url: string;
  method: HttpMethod;
  responses: ResponseNoId[];
};

type ApiNoId = Omit<Api, "id">;
type ApiNoRes = Omit<Api, "responses">;
type ApiNoIdRes = Omit<Api, "id" | "responses">;
type ApiUpdate = Partial<ApiNoIdRes> & { id: number };
