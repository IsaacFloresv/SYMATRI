import express from "express";
import { config } from "#config/config.js";


import emailRoutes from "#routers/emailRoutes.js";
import { corsMiddleware } from "#middlewares/corsMiddleware.js";

const app = express();

app.use(corsMiddleware);
app.use(express.json());

app.use(emailRoutes);

app.listen(config.appPort, () => {
  console.log(`Server UP at ${config.serviceUrl}:${config.appPort}/`);
});