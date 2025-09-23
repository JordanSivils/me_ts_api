import prisma from "../../../../services/prisma";
import { TransformedItemRow } from "../validation/itemSchema";
import { getBrandId, getCategoryId, getManufacturerId, getSupplierId } from "./cacheFk";

export async function processTransformedRow(
  transformedRow: TransformedItemRow
) {
  if (!transformedRow.sku) return;

  // negatives: keep as-is
  const normalizedAvailable = typeof transformedRow.available === "number"
    ? transformedRow.available
    : undefined;

  // ensure lookup records exist; get their IDs
  const brandName = transformedRow.brand || undefined
  const catName = transformedRow.category || null
  const manufName = transformedRow.manufacturer || null
  const supName = transformedRow.supplier || null

  
  // upsert the Item by SKU and connect lookups (no suppliers)
  await prisma.item.upsert({
    where: { sku: transformedRow.sku },
    create: {
      sku: transformedRow.sku,
      description: transformedRow.description,
      available: normalizedAvailable,
      status: (normalizedAvailable && normalizedAvailable < 0 ? "negative" : "standard" ),
      ...(brandName && {
        brand: {
          connectOrCreate: {
            where: { name: brandName },
            create: { name: brandName },
          } 
      },
      }),
      ...(catName && {
        category: {
          connectOrCreate: {
            where: { name: catName },
            create: { name: catName}
          }
        }
      }),
      ...(supName && {
        suppliers: {
          connectOrCreate: {
            where: { name: supName},
            create: { name: supName}
          }
        }
      }),
      ...(manufName && {
        manufacturer: { 
          connectOrCreate: {
            where: { name: manufName},
            create: { name: manufName }
          }
        }
      })
    },
    update: {
      description: transformedRow.description,
      available: normalizedAvailable,
      status: (normalizedAvailable && normalizedAvailable < 0 ? "negative" : "standard" ),
      ...(manufName && {
        manufacturer: { 
          connectOrCreate: {
            where: { name: manufName},
            create: { name: manufName }
          }
        }
      }),
      ...(supName && {
        suppliers: {
          connectOrCreate: {
            where: { name: supName},
            create: { name: supName}
          }
        }
      }),
      ...(catName && {
        category: {
          connectOrCreate: {
            where: { name: catName },
            create: { name: catName}
          }
        }
      }),
      ...(brandName && {
        brand: {
          connectOrCreate: {
            where: { name: brandName },
            create: { name: brandName },
          } 
        },
      })
    },
  });
}