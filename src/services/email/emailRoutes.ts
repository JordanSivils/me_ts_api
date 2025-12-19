import { Router } from "express";
import { connectToGoogle, googleAuthCallback } from "./googleAuthorization/gmailConfig";
import { createMailHandler } from "./sendEmail.ts/mail.controller";

const router = Router();

router.get("/google/connect", connectToGoogle);
router.get("/oauth2callback", googleAuthCallback)
router.get("/gmail/test", createMailHandler);

export default router