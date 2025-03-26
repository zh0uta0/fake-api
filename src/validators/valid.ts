import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { ParamsError } from "../libs/error";

type ReqProp = "body" | "params" | "query";

export const valid = (schema: z.ZodType, type: ReqProp = "body") => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req[type]);
    if (!result.success) {
      throw new ParamsError(
        result.error.errors.map((e) => e.message).join(",")
      );
    }
    next();
  };
};

export const validParams = (schema: z.ZodType) => valid(schema, "params");

export const methodSchema = z.enum(["get", "post", "put", "patch", "delete"]);
export const urlSchema = z.string().toLowerCase().startsWith("/");
export const idSchema = z
  .string()
  .regex(/^\d+$/, { message: "ID must be a number" });

export const validParamId = validParams(
  z.object({
    id: z.string().regex(/^\d+$/, { message: "ID must be a number" }),
  })
);
