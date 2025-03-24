import { Router } from "express";

import * as apiCtl from "../controllers/api";
import * as valid from "../validators/api";
import { validation } from "../validators/api";

export const router = Router();

// 获取全部 api
router.get("/", apiCtl.getAll);
// 根据id 获取 api
// router.get("/:id", valid.paramId(), validation, );
// 创建一个 api
router.post("/", valid.create, validation, apiCtl.create);
// 创建一个 response
router.post("/:id/res", valid.createRes, validation, apiCtl.createRes);
// 修改一个返回值
router.put("/:id", valid.update, validation, apiCtl.update);

export default router;
