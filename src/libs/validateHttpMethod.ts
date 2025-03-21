export const validHttpMethod = (methodStr: any) => {
  if (typeof methodStr !== "string") return false;

  const method = methodStr.toLowerCase();
  const isHttpMethod = ["get", "post", "put", "delete"].includes(method);
  if (!isHttpMethod) return false;

  return method;
};
