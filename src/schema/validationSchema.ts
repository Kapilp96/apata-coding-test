import z from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";

export const postRequestSchema = z.object({
  amount: z.number().nonnegative("Credit limit must be postive"),
  name: z.string().min(1, "Name cannot be empty"),
});

export const processTransactionSchema = z.object({
  cardNumber: z.string(),
  amount: z.number(),
});

export const postRequestJsonSchema = zodToJsonSchema(postRequestSchema);
