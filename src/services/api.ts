import { PrismaClient } from "@prisma/client";
import {
  ApiNoIdRes,
  ResOrfo,
  ApiNoId,
  ApiUpdate,
  ResUpdate,
  HttpMethod,
} from "../types/models";

const prisma = new PrismaClient();

// 创建接口
export const create = async (api: ApiNoIdRes) => {
  return await prisma.api.create({ data: { ...api } });
};

// 给接口添加返回值
export const addResById = async (id: number, res: ResOrfo) => {
  return await prisma.response.create({
    data: {
      content: res.content,
      alias: res.alias,
      apiId: id,
    },
  });
};

// 创建接口和返回值
export const createWithRes = async (api: ApiNoId) => {
  const { url, method, alias, responses = [] } = api;
  const created = await prisma.api.create({
    data: {
      url,
      method,
      alias,
      responses: {
        create: responses.map((res) => ({
          content: res.content,
          alias: res.alias ?? "",
          enable: res.enable ?? true,
        })),
      },
    },
    include: {
      responses: true,
    },
  });

  console.log("created", created);

  if (!created) throw new Error("创建失败");
  return created;
};

// 修改接口
export const updateApi = async (api: ApiUpdate) => {
  return await prisma.api.update({
    where: { id: api.id },
    data: { ...api },
  });
};

// 修改接口返回值
export const updateApiRes = async (res: ResUpdate) => {
  return await prisma.response.update({
    where: { id: res.id },
    data: {
      ...res,
    },
  });
};

// 删除接口和所有返回值
export const deleteById = async (id: number) => {
  const api = await prisma.api.findUnique({ where: { id } });
  if (!api) return;

  await prisma.response.deleteMany({ where: { apiId: id } });
  return await prisma.api.delete({ where: { id } });
};

// 删除接口的返回值

// 查寻所有接口
export const getApis = async () => {
  return await prisma.api.findMany();
};

// 查询接口返回值
type ApiQuery = {
  url?: string;
  id?: number;
};
export const getRes = async (id: number) => {
  const api = await prisma.api.findFirstOrThrow({
    where: { id },
    include: {
      responses: true,
    },
  });
  return api.responses;
};

// 根据url查询接口和返回值
export const getResByUrl = async (url: string, method: HttpMethod) => {
  // TODO: 添加查询条件 enable 为 true
  const api = await prisma.api.findFirst({
    where: { url, method },
    include: {
      responses: {
        where: { enable: true },
      },
    },
  });
  return api?.responses;
};

// 根据id查询接口和返回值
export const getById = async (id: number) => {
  return await prisma.api.findUnique({
    where: {
      id,
    },
    include: {
      responses: true,
    },
  });
};

// 根据url查询接口和返回值
