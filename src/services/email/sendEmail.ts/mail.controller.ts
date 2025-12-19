import { NextFunction, Request, Response } from "express";
import { sendMail } from "./createEmail";
import { getAllMeUsers } from "../../../api/v1/users/user.repository";

export const createMailHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = await getAllMeUsers();

        console.log(data)

        // await sendMail({
        //     to: ["jordan_sivils@yahoo.com", "jordan@mooreequine.com"],
        //     subject: "Test Gmail API (employees)",
        //     text: "employee list",
        //     html: emailUsersHtml(data) 
        // });

        res.json({ ok: true})
    } catch (error) {
        console.error(error);
    }
} 