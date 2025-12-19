import { google } from "googleapis"
import { gmailJson } from "../gmailClient"

const urlEncode = (str: string) => {
    return Buffer.from(str)
        .toString("base64")
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=+$/, "")
}

export const sendMail = async (opts: {
    to: string[],
    subject: string,
    text: string,
    html: string
}) => {
    const oAuth2Client = new google.auth.OAuth2(gmailJson.clientId, gmailJson.clientSecret)

    oAuth2Client.setCredentials({ refresh_token: gmailJson.refreshToken, access_token: gmailJson.accessToken})

    const gmail = google.gmail({ version: "v1", auth: oAuth2Client});

    const boundary = "boundry_" + Date.now()

    const rawMessage = [
        `From: ${gmailJson.emailAddres}`,
        `To: ${opts.to.join(", ")}`,
        `Subject: ${opts.subject}`,
        "MIME-Version: 1.0",
        `Content-Type: multipart/alternative; boundary="${boundary}"`,
        "",
        `--${boundary}`,
        'Content-Type: text/plain; charset="UTF-8"',
        "",
        opts.text,
        "",
        `--${boundary}`,
        'Content-Type: text/html; charset="UTF-8"',
        "",
        opts.html,
        "",
        `--${boundary}--`,
    ].join("\r\n");

    const raw = urlEncode(rawMessage);

    await gmail.users.messages.send({
        userId: "me",
        requestBody: { raw }
    })
}