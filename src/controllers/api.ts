import { Request, Response } from "express";
import * as api from "../services/api";
import { useDynamicRoute } from "../hooks/dynamic-route";
import { ResExt } from "../types/ext";
import { ApiNoId, ResOrfo, ResUpdate, RouteSchema } from "..//types/models";

export async function getAll(_: Request, res: Response) {
  const all = await api.getApis();
  (res as any as ResExt).success(all);
}

export async function getById(req: Request, res: Response) {
  const data = await api.getById(parseInt(req.params.id));
  if (!data) throw new Error("没有数据");
  (res as any as ResExt).success(data);
}

export async function getResById(req: Request, res: Response) {
  const id = parseInt(req.params.id);
  const data = await api.getRes(id);
  (res as any as ResExt).success(data);
}

export async function create(req: Request, res: Response) {
  const { url, method } = req.body;
  const created = await api.create({ url, method });

  const { create } = await useDynamicRoute();
  create({ url, method });

  res.json({ code: 200, msg: "创建成功", data: created });
}

export async function createRes(req: Request, res: Response) {
  const id = parseInt(req.params.id);
  const { content, alias = "", enable = true } = req.body as ResOrfo;

  const created = await api.addResById(id, { content, alias, enable });
  res.json({ code: 200, msg: "添加返回值成功", data: created });
}

export async function createWithRes(req: Request, res: Response) {
  const { url, method, alias = "", responses } = req.body as ApiNoId;
  const data = await api.createWithRes({ url, method, alias, responses });
  const { create } = await useDynamicRoute();
  create({ url, method });
  (res as ResExt).success(data);
}

export async function update(req: Request, res: Response) {
  const id = parseInt(req.params.id);
  let { url, method, alias = "" } = req.body;

  const created = await api.updateApi({ id, url, method, alias });

  const { update } = await useDynamicRoute();
  update({ url, method });

  res.json({ code: 200, msg: "成功", data: created });
}

export async function remove(req: Request, res: Response) {
  const id = parseInt(req.params.id);
  const data = await api.deleteById(id);
  if (data) {
    const { remove } = await useDynamicRoute();
    remove(data as RouteSchema);
  }
  console.log("data111111", data);

  (res as ResExt).success(data);
}
