import { z } from "zod";

export const uiNodeSchema: z.ZodType<any> = z.lazy(() =>
  z.object({
    type: z.string(),
    props: z.record(z.unknown()).optional(),
    children: z.array(uiNodeSchema).optional(),
  })
);
