import { Request, Response } from "express";
import * as apiSer from "../services/api";

export async function controller(req: Request, res: Response) {
  // TODO: 参数校验
  const url = req.url;

  // 通过 url 查询 该 api 的返回值
  const resList = await apiSer.getRes({ url });
  if (resList?.length < 1)
    res.json({ code: 200, msg: "成功", data: "该接口没有返回值" });

  // TODO: 结果需要根据 api.resType 返回
  res.json({ code: 200, msg: "成功", data: resList[0].content });
}
