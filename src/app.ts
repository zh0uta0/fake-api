import express from "express";
import cors from "cors";
import "express-async-errors";
import path from "path";
import apiRoute from "./routes/api";

import { useDynamicRoute } from "./hooks/dynamic-route";
import { logger } from "./hooks/logger";
import { errors } from "./hooks/errors";
import { success } from "./hooks/success";

const app = express();

// 加载所有路由
useDynamicRoute(app);

// 中间件
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(logger);
app.use(success);

app.use("/api", apiRoute);

// 错误处理中间件（必须放在所有路由之后）
app.use(errors);

app.listen(9468, () => {
  console.log("🚀 ~ app.listen ~ 9468:");
});
