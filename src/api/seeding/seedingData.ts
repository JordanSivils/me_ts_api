import { prisma } from "../../middleware/prisma"

interface MappingRecord {
  'Sub Category': string;
  'Combined Category': string;
  'Category': string;
}

 export const mappingData = async (record: MappingRecord) => {
  const subCategoryName = record['Sub Category']?.trim() || '';
  const combinedCategoryName = record['Combined Category']?.trim() || '';
  const categoryName = record['Category']?.trim() || '';

  if (!subCategoryName || !combinedCategoryName || !categoryName) {
    console.error('Invalid record:', record);
    throw new Error('Missing required fields in the CSV file.');
  }
  const subCatData = await prisma.subcategory.create({
    data: {
      name: record['Sub Category'],
      combinedCategory: {
        connectOrCreate: {
          where: { name: record['Combined Category'] },
          create: {
            name: record['Combined Category'],
            category: {
              connectOrCreate: {
                where: { name: record['Category'] },
                create: { name: record['Category'] },
              },
            },
          },
        },
      },
    }
  })

  return subCatData
 }