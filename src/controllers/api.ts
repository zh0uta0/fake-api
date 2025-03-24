import { Request, Response } from "express";
import * as api from "../services/api";
import { validHttpMethod } from "../libs/validateHttpMethod";
import { ParamsError } from "../libs/error";
import { useDynamicRoute } from "../hooks/dynamic-route";
import { ResExt } from "../types/ext";

export async function getAll(_: Request, res: Response) {
  const all = await api.getApis();
  (res as any as ResExt).success(all);
}

export async function create(req: Request, res: Response) {
  let { url, method } = req.body;
  const created = await api.create({ url, method });

  const { create } = await useDynamicRoute();
  create({ url, method });

  res.json({ code: 200, msg: "创建成功", data: created });
}

export async function createRes(req: Request, res: Response) {
  const id = parseInt(req.params.id);
  const { content, alias = "" } = req.body as ResOrfo;

  const created = await api.addResById(id, { content, alias });
  res.json({ code: 200, msg: "添加返回值成功", data: created });
}

export async function update(req: Request, res: Response) {
  let { url, method, id } = req.body;

  const created = await api.updateApi({ url, method, id });
  res.json({ code: 200, msg: "成功", data: created });
}
