import express, { Express } from "express";
import "express-async-errors";
import path from "path";
import apiRoute from "./routes/api";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// 答应请求参数
app.use((req, res, next) => {
  console.log("********* req.body *********");
  console.dir(req.body, { depth: null });
  console.log("********* req.params *******");
  console.dir(req.params, { depth: null });
  console.log("****************************");
  next();
});

app.use("/api", apiRoute);

// 错误处理中间件（必须放在所有路由之后）
app.use((err: any, req: any, res: any, next: any) => {
  console.log("=======================================================");
  console.dir(err, { depth: null });
  console.log("=======================================================");

  // 返回 JSON 格式的错误信息
  res.json({
    code: err.code ?? 400,
    msg: err.message ?? "未知错误",
    data: err.stack || "",
  });
});

app.listen(9468, () => {
  console.log("🚀 ~ app.listen ~ 9468:");
});
