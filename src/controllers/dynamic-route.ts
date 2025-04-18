import { Request, Response } from "express";
import * as apiSer from "../services/api";
import { getResIdx } from "../hooks/dynamic-route";
import { HttpMethod } from "../types/models";
import { log } from "console";

export async function controller(req: Request, res: Response) {
  const url = req.path;
  const method = req.method.toLowerCase() as HttpMethod;

  // 通过 url 查询 该 api 的返回值
  const resList = await apiSer.getResByUrl(url, method);
  if (resList && resList.length > 0) {
    const idx = getResIdx(url, method, resList.length);
    res.json(resList[idx].content);
  } else {
    res.json({ code: 200, msg: "成功", data: "该接口没有返回值" });
  }
}
