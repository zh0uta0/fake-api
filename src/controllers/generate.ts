import { Request, Response } from "express";

import * as apiSer from "../services/api";
import { dir } from "console";

export async function generate(req: Request, res: Response) {
  const app = req.app;
  const all = (await apiSer.getApis()) as ApiNoRes[];

  all.forEach((e) => {
    app[e.method](e.url, (res, req) => {
      req.json(e);
    });
  });

  dir(app.stack, { depth: null });

  res.json({ code: 200, msg: "成功", data: all });
}
