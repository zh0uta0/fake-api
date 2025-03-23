export const errors = (err: any, req: any, res: any, next: any) => {
  console.log("\n=======================================================");
  console.dir(err, { depth: null });
  console.log("=======================================================\n");

  const code = err.code || 500;
  // 返回 JSON 格式的错误信息
  res.status(code).json({
    msg: err.message ?? "未知错误",
    data: err.stack || null,
    code,
  });
};
