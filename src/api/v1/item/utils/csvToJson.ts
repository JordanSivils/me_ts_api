
import * as csv from 'fast-csv';
import { ItemRow, TransformedItemRow } from '../types/itemSchema';
import { processTransformedRow } from './processRow';

export const itemUploadHandler = (csvFile: string) => {
    const stream = csv.parse<ItemRow, TransformedItemRow>({
        headers: headers => headers.map(h => h?.toLowerCase()),
        ignoreEmpty: true
    })
        .transform(
            (data: ItemRow): TransformedItemRow => ({
                sku: data.sku.toLowerCase(),
                description: data.description,
                available: Number(data.available),
                manufacturer: data.manufacturer || undefined,
                brand: data.brand || undefined,
                category: data.category || undefined,
                supplier: data.supplier || undefined,
            })
        )
        .on('error', error => console.error(error))
        .on('data', async (transformedRow: TransformedItemRow) => {
            stream.pause();
            try {
                await processTransformedRow(transformedRow);
            } catch (error) {
                console.error("Row Failed:", error)
            } finally {
                stream.resume();
            }
        })
        .on('end', (rowCount: number) => console.log(`parse ${rowCount} rows`)
        
    )

        stream.write(csvFile)
        stream.end()
}   