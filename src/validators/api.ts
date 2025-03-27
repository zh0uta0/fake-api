import { z } from "zod";
import { idSchema, methodSchema, urlSchema, valid, validParams } from "./valid";

export type ResSchema = {
  content: any;
  alias?: string;
};

const apiSchema = z.object({
  url: urlSchema,
  method: methodSchema,
  alias: z.string().optional(),
});

// const resSchema = z.object({
//   content: z.any(),
//   alias: z.string().optional(),
// });

export const validApi = valid(apiSchema);

// export const validRes = valid(resSchema);
