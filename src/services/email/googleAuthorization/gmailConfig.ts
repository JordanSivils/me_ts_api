import { google } from "googleapis";
import { gmailClient, gmailJson } from "../gmailClient";

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REDIRECT_URI = process.env.GOOGLE_CALLBACK_URI;

// const oauth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

export const connectToGoogle = async (req: any, res: any) => {
    if (!gmailJson.clientId || !gmailJson.clientSecret || !gmailJson.redirectUrl || !gmailJson.googleScope) {
        throw new Error("Missing client id or client secret")
    }

    

    const authorizationUrl = gmailClient.generateAuthUrl({
        access_type: "offline",
        scope: [gmailJson.googleScope],
        prompt: "consent",
        include_granted_scopes: true,
    })

    return res.redirect(authorizationUrl)
}

export const googleAuthCallback = async (req: any, res: any) => {
  const code = req.query.code as string | undefined;
  if (!code) return res.status(400).send("Missing code");

  const { tokens } = await gmailClient.getToken(code);
  // tokens.refresh_token is what you want to store in Railway env vars
  console.log("TOKENS:", tokens);

  return res.send("Authorized. Check server logs for refresh_token.");
};