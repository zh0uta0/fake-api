import { Request } from "express";
export type ResExt = Request & {
  success: (data: any, message?: string) => void;
};
