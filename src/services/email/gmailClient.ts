import { google } from "googleapis";

export const gmailJson = {
    clientId: process.env.GOOGLE_CLIENT_ID ,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    redirectUrl: process.env.GOOGLE_CALLBACK_URI,
    emailAddres: process.env.GOOGLE_SEND_EMAIL,
    refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
    accessToken: process.env.GOOGLE_ACCESS_TOKEN,
    googleScope: process.env.GOOGLE_SCOPE
}

export const gmailClient = new google.auth.OAuth2(gmailJson.clientId, gmailJson.clientSecret, gmailJson.redirectUrl);


