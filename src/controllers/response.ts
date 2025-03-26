import { Request, Response } from "express";
import * as resp from "../services/response";
import { ResExt } from "../types/ext";
import { Res, ResNoId } from "../types/models";

// 创建
export async function create(req: Request, res: Response) {
  const { content, alias = "", apiId, enable = true } = req.body as ResNoId;
  const data = await resp.create({ content, alias, apiId, enable });
  (res as ResExt).success(data);
}

// 修改
export async function update(req: Request, res: Response) {
  const id = parseInt(req.params.id);
  const { content, alias = "", apiId, enable = true } = req.body as ResNoId;
  const data = await resp.update({ id, content, alias, apiId, enable });
  (res as ResExt).success(data);
}
// 删除
export async function remove(req: Request, res: Response) {
  const id = parseInt(req.params.id);
  const data = await resp.remove(id);
  (res as ResExt).success(data);
}
