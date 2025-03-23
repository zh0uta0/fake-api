export const logger = (req: any, res: any, next: any) => {
  const method = req.method; // 获取请求方法
  const url = req.originalUrl; // 获取请求的完整 URL
  const queryParams = req.query; // 获取 URL 中的查询参数
  const bodyParams = req.body; // 获取请求体中的参数（需要先使用 body-parser 中间件）

  console.log(`Request Method: ${method}`);
  console.log(`Request URL: ${url}`);
  console.log(`Query Parameters:`, queryParams);
  console.log(`Body Parameters:`, bodyParams);

  next(); // 继续处理请求
};
