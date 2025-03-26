import { Router } from "express";

import * as apiCtl from "../controllers/api";
import { validApi } from "../validators/api";
import { validParamId } from "../validators/valid";
import { validRes } from "../validators/response";

export const router = Router();

// 获取全部 api
router.get("/", apiCtl.getAll);
router.get("/:id", validParamId, apiCtl.getById);
router.get("/:id/res", validParamId, apiCtl.getResById);

router.post("/", validApi, apiCtl.create);
router.post("/:id/res", validParamId, validRes, apiCtl.createRes);
router.put("/:id", validParamId, validApi, apiCtl.update);
router.delete("/:id", validParamId, apiCtl.remove);

export default router;
