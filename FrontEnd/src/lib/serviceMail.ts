import { config } from "@/config/config.js";

// la estructura que espera el endpoint /sendemail
export interface EmailPayload {
    name: string;
    apell1: string;
    apell2: string;
    email: string;
    mensaje: string;
    subject: string;
    Instituto: string;
}

/**
 * Envía un payload arbitrario al servicio de correo.
 * Utiliza los headers de configuración (incluyendo la api key).
 */
export async function sendEmail(payload: EmailPayload): Promise<void> {
    const res = await fetch(`${config.servicemail}/sendemail`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "x-api-key": config.apiKeyHash,
        },
        body: JSON.stringify(payload),
    });
    if (!res.ok) {
        const text = await res.text().catch(() => "");
        const err = new Error(text || `status ${res.status}`);
        console.error("sendEmail failed", err);
        throw err;
    }
}

/**
 * Genera un código numérico de 6 dígitos y lo envía al servicio de correo.
 * Devuelve la cadena del código generado (para guardarlo en estado y verificarlo).
 */
export async function sendVerificationEmail(fullName: string, to: string): Promise<string> {
    // generamos 6 dígitos aleatorios (100000-999999)
    const code = Math.floor(100000 + Math.random() * 900000).toString();

    // separamos nombre completo en partes opcionales para el backend
    const parts = fullName.trim().split(" ");
    const name = parts[0] || "";
    const apell1 = parts[1] || "";
    const apell2 = parts.slice(2).join(" ") || "";

    const payload: EmailPayload = {
        name,
        apell1,
        apell2,
        email: to,
        subject: "Código de verificación",
        mensaje: `Tu código de verificación es ${code}`,
        Instituto: "MATRICOOL",
    };

    // reutilizar la función genérica
    await sendEmail(payload);

    return code;
}
