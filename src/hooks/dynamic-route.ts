import { Express } from "express";
import { getApis } from "../services/api";
import * as dynamicRouteCtl from "../controllers/dynamic-route";

let App: Express;

// 注册路由
export async function useDynamicRoute(app?: Express) {
  if (!App && app) {
    App = app;
    await register();
  }

  return {
    create,
    remove,
    update,
  };
}

// 注册数据库中已有的接口
async function register() {
  const all = await getApis();
  all.forEach((e) => create(e as RouteSchema));
}

// 创建接口
export function create(routeScheme: RouteSchema) {
  console.log("🚀 ~ create ~ routeScheme:", routeScheme);
  const { method, url } = routeScheme;
  App[method](url, dynamicRouteCtl.controller);
}

// 删除接口
export function remove(url: string) {
  App.stack = App.stack.filter((e) => e.path !== url);
}

// 更新接口
export function update(routeScheme: RouteSchema) {
  remove(routeScheme.url);
  create(routeScheme);
}
