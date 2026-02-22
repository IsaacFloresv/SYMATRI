import nodemailer from "nodemailer";
import { config } from "#config/config.js";

export async function sendEmailController(req, res) {
  try {
    const { name, apell1, apell2, email, mensaje, subject, Instituto } = req.body;

    const transporte = nodemailer.createTransport({
      service: config.serviceEmail,
      secure: true,
      auth: {
        user: config.userEmail,
        pass: config.userPass, // ESTA debe ser la App Password
      },
    }/* {
      host: config.emailHost,
      port: config.emailPort,
      secure: true,
      auth: {
        user: config.userEmail,
        pass: config.userPass,
      },
    } */);

    const info = await transporte.sendMail({
      from: `'${Instituto}' <${config.userEmail}>`,
      to: `${name} ${apell1} ${apell2} <${email}>`,
      subject,
      html: mensaje,
    });

    console.log("Email enviado:", info.response);

    res.json({ status: "OK" });
  } catch (error) {
    console.error("Error enviando email:", error);
    res.status(500).json({ message: error.message });
  }
}