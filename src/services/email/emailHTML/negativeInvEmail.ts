import { ItemRow } from "../../../api/v1/item/types/itemSchema";
import { sendMail } from "../sendEmail.ts/createEmail";

export const sendNegativeMail = async (items: ItemRow[]) => {
    const count = items.length
    const employees = ["jordan_sivils@yahoo.com", "jordan@mooreequine.com"]
    await sendMail({
        to: employees,
        subject: "Negative Inventory",
        text: `There are ${count} negative products in inventory, please handle these.`,
        html: negativeInvHtml(items)
    })
}

const negativeInvHtml = (items: ItemRow[]) => {
    const count = items.length
    
    const negatives = items.map((item) => (
        
        `<li>${(item.description)}: ${item.available ?? 0}</li>`
    )).join("")

    return `
            <div style="font-family: Arial, sans-serif;">
            <h2 style="margin:0 0 8px 0;">Negative Inventory List</h2>
            <p style="margin:0 0 12px 0;">There are <strong>${count}</strong> Negative Products in Inventory at the time of this email</p>
            <ul style="padding-left: 18px; margin: 0 0 12px 0;">${negatives}</ul>
            <p style="font-size:12px;color:#777;margin:0;">
            This is my personal Gmail. Any responses should be sent to jordan@mooreequine.com.
            </p>    
            </div>
            `
}