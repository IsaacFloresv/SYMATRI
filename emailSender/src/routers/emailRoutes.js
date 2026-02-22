import { Router } from "express";
import { sendEmailController } from "#controllers/sendEmailController.js";
import { apiKeyMiddleware } from "#middlewares/apikeyMiddleware.js";


const router = Router();

router.post("/sendemail", apiKeyMiddleware, sendEmailController);

export default router;