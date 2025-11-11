import { z } from "zod";
import { userSchema } from "./userSchema.ts";

export const loginSchema = userSchema.omit({
    name_user: true, 
    role_user: true
}).extend({
    email_user: userSchema.shape.email_user,
    password_user: userSchema.shape.password_user
});

export type loginData = z.infer<typeof loginSchema>;
