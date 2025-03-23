import { Router } from "express";
import * as apiCtl from "../controllers/api";

export const router = Router();

router.get("/", apiCtl.getAll);
router.post("/", apiCtl.create);
router.post("/:id/res", apiCtl.createRes);
router.put("/:id", apiCtl.update);

export default router;
