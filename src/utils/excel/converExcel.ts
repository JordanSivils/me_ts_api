import * as XLSX from 'xlsx'

export const excelToCsv = (buffer: Buffer) => {
    const workbook = XLSX.read(buffer, { type: "buffer"})
           const sheetName = workbook.SheetNames[0]
           const sheet = workbook.Sheets[sheetName]
            const csvData = XLSX.utils.sheet_to_csv(sheet)
            return csvData
}

export const excelToJson = (buffer: Buffer) => {
    const workbook = XLSX.read(buffer, { type: "buffer"})
           const sheetName = workbook.SheetNames[0]
           const sheet = workbook.Sheets[sheetName]
            const jsonData = XLSX.utils.sheet_to_json<Record<string, unknown>>(sheet)
            console.log(jsonData)
            return jsonData
}