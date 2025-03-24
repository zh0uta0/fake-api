import { Request, Response, NextFunction } from "express";
import { query, param, body, validationResult } from "express-validator";

export const paramId = () =>
  param("id")
    .notEmpty()
    .withMessage("缺少参数 id")
    .isInt()
    .withMessage("id 为整数");

export const id = () =>
  body("id")
    .notEmpty()
    .withMessage("缺少参数 id")
    .isInt()
    .withMessage("id 为整数");

export const url = () =>
  body("url")
    .exists()
    .withMessage("url 参数必须存在")
    .isString()
    .withMessage("url 参数必须是字符串")
    .matches(/^\/.*/)
    .withMessage("url 参数必须以 / 开头");

export const method = () =>
  body("method")
    .isString()
    .toLowerCase()
    .isIn(["get", "post", "put", "patch", "delete"])
    .withMessage("method 必须为 http 请求类型");

export const response = () =>
  body("content").notEmpty().withMessage("content 不能为空");

export const validation = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // 如果校验失败，返回错误信息
    res.status(400).json({ errors: errors.array() });
    return;
  }
  next();
};

export const create = [url(), method()];
export const createRes = [id(), response()];
export const update = [id(), url(), method()];
