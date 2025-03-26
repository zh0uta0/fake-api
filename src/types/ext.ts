import { Response } from "express";

export interface ResExt extends Response {
  success: (data: any, message?: string) => void;
}
