type HttpMethod = "get" | "post" | "put" | "delete";

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
  resType: string;
};

type ApiNoId = Omit<Api, "id">;
type ApiNoIdRes = Omit<Api, "id" | "responses">;
type ApiUpdate = Partial<ApiNoIdRes> & { id: number };
