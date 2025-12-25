import { z } from "zod";
import { userSchema } from "./userSchema.ts";

export const loginSchema = userSchema.shape.datosPersonales.pick({
  name_user: true,
  password_user: true,
});

export type loginData = z.infer<typeof loginSchema>;
