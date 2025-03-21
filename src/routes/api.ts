import { Router } from "express";
import * as api from "../services/api";

export const router = Router();

router.get("/", async (_, res) => {
  try {
    const all = await api.getApis();
    res.json({ code: 200, msg: "成功", data: all });
  } catch (error) {
    res.json({ code: 500, msg: "出错了", data: error });
  }
});

router.post("/", async (req, res) => {
  const { url, method, resType = "turn" } = req.body;
  if (!url || !method) res.json({ code: 400, msg: "缺少参数", data: req.body });

  try {
    const created = await api.create({ url, method, resType });
    res.json({ code: 200, msg: "创建成功", data: created });
  } catch (error) {
    res.json({ code: 500, msg: "出错了", data: error });
  }
});

router.post("/:id/res", async (req, res) => {
  const id = parseInt(req.params.id);
  const { content, alias = "" } = req.body as ResOrfo;
  if (!content || !id) res.json({ code: 400, msg: "缺少参数", data: req.body });

  try {
    const created = await api.addResById(id, { content, alias });
    res.json({ code: 200, msg: "添加返回值成功", data: created });
  } catch (error) {
    res.json({ code: 500, msg: "出错了", data: error });
  }
});

router.put("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const { url, method, resType } = req.body;
  if (!id) res.json({ code: 400, msg: "缺少参数", data: req.body });

  const updateApi = {} as Partial<ApiNoIdRes>;
  if (url) updateApi.url = url;
  if (method) updateApi.method = method;
  if (resType) updateApi.resType = resType;

  try {
    const created = await api.updateApi({ id, ...updateApi });
    res.json({ code: 200, msg: "成功", data: created });
  } catch (error) {
    res.json({ code: 500, msg: "出错了", data: error });
  }
});

export default router;
