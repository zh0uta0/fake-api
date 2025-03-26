import { Request, Response } from "express";
import * as apiSer from "../services/api";
import { getResIdx } from "../hooks/dynamic-route";
import { HttpMethod } from "../types/models";

export async function controller(req: Request, res: Response) {
  const url = req.url;
  const method = req.method;

  // 通过 url 查询 该 api 的返回值
  const resList = await apiSer.getResByUrl(
    url,
    method.toLowerCase() as HttpMethod
  );
  if (resList?.length < 1)
    res.json({ code: 200, msg: "成功", data: "该接口没有返回值" });

  const idx = getResIdx(url, method, resList.length);
  res.json(resList[idx].content);
}
