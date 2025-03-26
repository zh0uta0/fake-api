import { Express } from "express";
import { getApis } from "../services/api";
import * as dynamicRouteCtl from "../controllers/dynamic-route";
import { RouteSchema } from "../types/models";

let App: Express;
let resIndexCounter = new Map<string, number>();

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

  // 添加返回值值索引
  resIndexCounter.set(getMapKey(url, method), 0);
}

// 删除接口
export function remove(url: string) {
  App.stack = App.stack.filter((e) => e.path !== url);
  resIndexCounter.delete(url);
}

// 更新接口
export function update(routeScheme: RouteSchema) {
  remove(routeScheme.url);
  create(routeScheme);
}

// 获取下一个返回值索引
export function getResIdx(url: string, method: string, resListLength: number) {
  const key = getMapKey(url, method);
  if (!resIndexCounter.has(key)) {
    resIndexCounter.set(key, 0);
    return 0;
  }

  let idx = resIndexCounter.get(key) as number;
  idx++;
  if (idx >= resListLength) idx = 0;
  resIndexCounter.set(key, idx);
  return idx;
}

function getMapKey(url: string, method: string) {
  return url + ":" + method;
}
