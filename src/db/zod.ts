import { createInsertSchema } from "drizzle-zod";
import { userDetails } from "./schema";

export const insertUserSchema = createInsertSchema(userDetails);
