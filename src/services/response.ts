import { PrismaClient } from "@prisma/client";
import { Res, ResNoId } from "../types/models";

const prisma = new PrismaClient();

// 查询所有response根据apiId
export const getByApiId = async (apiId: number) => {
  return await prisma.response.findMany({ where: { apiId } });
};

// 创建response根据apiId
export const create = async (res: ResNoId) => {
  const api = await prisma.api.findUnique({
    where: { id: res.apiId },
  });

  if (!api) throw new Error(`id为${res.apiId}的api不存在`);

  return await prisma.response.create({
    data: res,
  });
};

// 创建response根据apiId
export const createBatch = async (res: ResNoId[]) => {
  return await prisma.response.createMany({
    data: res,
  });
};

// 更新response根据id
export const update = async (res: Res) => {
  const { id, ...rest } = res;
  return prisma.response.update({
    where: { id },
    data: rest,
  });
};

// 删除response根据id
export const remove = async (id: number) => {
  return prisma.response.delete({ where: { id } });
};

// 删除response根据apiId
export const removeBatch = async (apiId: number) => {
  return prisma.response.deleteMany({ where: { apiId } });
};
