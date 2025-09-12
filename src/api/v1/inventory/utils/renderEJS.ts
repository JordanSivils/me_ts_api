import path from "path"
import ejs from "ejs"
import { InventoryRow } from "../types/inventoryTypes"
import puppeteer from "puppeteer"

const htmlToPdf = async (html: string): Promise<Buffer> => {
    const browser = await puppeteer.launch({
        headless: true,
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
    })
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: "networkidle0" });
    const pdf = await page.pdf({
        format: "A4",
        printBackground: true,
        margin: { top: "12mm", right: "12mm", bottom: "12mm", left: "12mm" }
    })
    await browser.close();
    return Buffer.from(pdf)
}


const renderInventory = (
    data: { 
        title: string,
        rows: InventoryRow[]
    }
): Promise<string> => {
    const pdfPath = path.join(__dirname, "..", "views", "inventory.ejs")
    return ejs.renderFile(pdfPath, data)
}


export const makeInventoryPdf = async (
    rows: InventoryRow[],
    title = "Inventory"
): Promise<Buffer> => {
    const html = await renderInventory({ title, rows });
    return htmlToPdf(html);
}