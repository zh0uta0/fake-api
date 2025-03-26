import { Router } from "express";
import * as resp from "../controllers/response";
import { validParamId } from "../validators/valid";
import { validRes } from "../validators/response";

export const router = Router();
// 创建
router.post("/", validRes, resp.create);
// 修改
router.put("/:id", validParamId, validRes, resp.update);
// 删除
router.delete("/:id", validParamId, resp.remove);

export default router;
