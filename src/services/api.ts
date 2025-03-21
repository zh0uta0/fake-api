import { PrismaClient } from "@prisma/client";

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
export const createWithRes = async (api: ApiNoId) => {};

// 修改接口
export const updateApi = async (api: Partial<ApiUpdate>) => {
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

// 删除接口的返回值

// 查寻所有接口
export const getApis = async () => {
  return await prisma.api.findMany();
};

// 根据url查询接口和返回值

// 根据id查询接口和返回值

// 根据url查询接口和返回值
