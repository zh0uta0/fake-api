import { Router } from "express";
import * as api from "../services/api";

import { validHttpMethod } from "../libs/validateHttpMethod";
import { ParamsError } from "../libs/error";

export const router = Router();

router.get("/", async (_, res) => {
  const all = await api.getApis();
  res.json({ code: 200, msg: "成功", data: all });
});

router.post("/", async (req, res) => {
  let { url, method, resType = "turn" } = req.body;
  method = validHttpMethod(method);
  if (!url || !method) throw new ParamsError();

  const created = await api.create({ url, method, resType });
  res.json({ code: 200, msg: "创建成功", data: created });
});

router.post("/:id/res", async (req, res) => {
  const id = parseInt(req.params.id);
  const { content, alias = "" } = req.body as ResOrfo;
  if (!content || !id) throw new ParamsError();

  const created = await api.addResById(id, { content, alias });
  res.json({ code: 200, msg: "添加返回值成功", data: created });
});

router.put("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  let { url, method, resType } = req.body;
  method = validHttpMethod(method);
  if (!id) throw new ParamsError();

  const updateApi = {} as Partial<ApiNoIdRes>;
  if (url) updateApi.url = url;
  if (method) updateApi.method = method;
  if (resType) updateApi.resType = resType;

  const created = await api.updateApi({ id, ...updateApi });
  res.json({ code: 200, msg: "成功", data: created });
});

export default router;
