import { z } from "zod";

export const tableSchema = z
  .object({
    type: z.literal("table"),
    props: z.object({
      columns: z
        .array(
          z.object({
            accessorKey: z.string().describe("Key in the row data object"),
            header: z.string().describe("Column header text"),
          }),
        )
        .describe("Column definitions"),
      tableData: z
        .array(z.record(z.unknown()))
        .describe("Array of row data objects"),
    }),
  })
  .describe("A data table with columns and rows");
