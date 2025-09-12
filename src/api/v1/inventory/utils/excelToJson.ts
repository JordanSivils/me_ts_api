import { buffer } from "stream/consumers";
import * as XLSX from 'xlsx'
import { InventoryRow, RawRow } from "../types/inventoryTypes";

export const readWorkbook = (buffer: Buffer) => {
    const wb = XLSX.read(buffer, { type: "buffer"});
    const ws = wb.Sheets[wb.SheetNames[0]];
    const rows = XLSX.utils.sheet_to_json<Record<string, any>>(ws, { defval: "" })
    return rows
}

const headerMap = {
    description: ["Description", "Item", "Name"],
    available: ["Available", "Qty", "Quantity"]
}

const getCell = (r: RawRow, names: string[]) => {
    for (const k of names) {
        const v = r[k]
        if (v !== undefined && v !== null && String(v) !== "") return v
    }
    return ""
}

export const mapToInventory = (raw: RawRow[]): InventoryRow[] => {
    return raw
        .map((r) => ({
            description: String(getCell(r, headerMap.description)).trim(),
            available: Number(getCell(r, headerMap.available)) || 0
        }))
        .filter((r) => r.description !== "")
}