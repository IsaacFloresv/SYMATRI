import { z } from "zod";

export const userSchema = z.object({
    name_user: z.string().min(3, {message: "El nombre debe tener al menos 3 caracteres"}).max(50, {message: "El nombre no puede tener más de 50 caracteres"}),
    email_user: z.string().email({message: "El correo electrónico no es válido"}),
    password_user: z.string().min(6, {message: "La contraseña debe tener al menos 6 caracteres"}).max(100, {message: "La contraseña no puede tener más de 100 caracteres"}),
    role_user: z.enum(["admin", "user"], {message: "El rol debe ser 'admin' o 'user'"}).optional()
});

export type User = z.infer<typeof userSchema>;