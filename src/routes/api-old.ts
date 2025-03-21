import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const router = Router();

router.get("/", async (_, res) => {
  try {
    const apis = await prisma.api.findMany();
    console.dir(apis, { depth: null });
    // const data = apis.map((e) => ({
    //   id: e.id,
    //   url: e.url,
    //   method: e.method,
    //   response: JSON.parse(e.response),
    // }));
    // console.dir(data, { depth: null });

    res.json({
      code: 200,
      msg: "查询成功",
      apis,
    });
  } catch (error) {
    res.json({
      code: 500,
      msg: "出错了",
      data: error,
    });
  }
});

router.get("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  if (!id) res.json({ code: 400, msg: "缺少参数" });

  try {
    const api = await prisma.api.findUnique({ where: { id } });
    res.json({ code: 200, msg: "查询成功", data: api });
  } catch (error) {
    res.json({ code: 500, msg: "出错了", data: error });
  }
});

router.post("/", async (req, res) => {
  const { url, method, response } = req.body;
  if (!url || !method || !response) res.json({ code: 400, msg: "缺少参数" });
  console.dir(req.body, { depth: null });
  // res.json({ code: 400, msg: "缺少参数" });

  try {
    const api = await prisma.api.create({
      data: { url, method, response },
    });
    console.log("🚀 ~ router.post ~ api:", api);
    res.json({ code: 200, msg: "创建成功", data: api });
  } catch (error) {
    res.json({
      code: 500,
      msg: "出错了",
      data: error,
    });
  }
});

router.put("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  if (!id) res.json({ code: 400, msg: "缺少参数" });

  const { url, method, response } = req.body;
  if (!url || !method || !response) res.json({ code: 400, msg: "缺少参数" });

  const api = { url, method, response };
  console.dir(api, { depth: null });

  try {
    const updated = await prisma.api.upsert({
      where: { id },
      update: api,
      create: { id, ...api },
    });
    console.dir(updated, { depth: null });

    res.json({ code: 200, msg: "修改成功", data: updated });
  } catch (error) {
    res.json({
      code: 500,
      msg: "出错了",
      data: error,
    });
  }
});

router.delete("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  if (!id) res.json({ code: 400, msg: "缺少参数" });

  try {
    await prisma.api.delete({ where: { id } });
    res.json({ code: 200, msg: "删除成功", data: null });
  } catch (error) {
    res.json({ code: 200, msg: "删除成功", data: null });
  }
});

export default router;
