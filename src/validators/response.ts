import { z } from "zod";
import { idSchema, valid } from "./valid";

export const resSchema = z.object({
  content: z.any(),
  alias: z.string().optional(),
  apiId: z.number().int(),
  enable: z.boolean().optional(),
});

export const validRes = valid(resSchema);
