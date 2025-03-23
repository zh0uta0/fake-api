export const errors = (err: any, req: any, res: any, next: any) => {
  console.log("=======================================================");
  console.dir(err, { depth: null });
  console.log("=======================================================");

  // 返回 JSON 格式的错误信息
  res.json({
    code: err.code ?? 400,
    msg: err.message ?? "未知错误",
    data: err.stack || "",
  });
};
