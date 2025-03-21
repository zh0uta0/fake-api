import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

// 增
// export function create(api: ApiNoId) {
//   const { url, method, response, resType } = api;
//   prisma.api.create({
//     data: {
//       url,
//       method,
//       // response,
//       resType,
//     },
//   });
// }
// 删
// export function

// 改
// 查
