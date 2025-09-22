import prisma from "../../../../services/prisma"

type IdPromise = Promise<string>
type IdCache = Map<string, IdPromise>

const brandIdCache = new Map()
const categoryIdCache = new Map()
const supplierIdCache = new Map()
const manufacturerIdCache = new Map()

const getOrCreateByName =(cache: IdCache, model: any, name?: string | null): IdPromise | null => {
    if (!name) return null

    const existing = cache.get(name);
    if (existing) return existing;

    const idPromise: IdPromise = model
        .upsert({
            where: { name },
            update: {},
            create: { name },
            select: {id: true}
        })
        .then((record: { id: string }) => record.id)
    
    cache.set(name, idPromise)
    return idPromise
}

export const getBrandId = (name?: string | null) => getOrCreateByName(brandIdCache, prisma.brand, name)
export const getCategoryId = (name?: string | null) => getOrCreateByName(brandIdCache, prisma.category, name)
export const getSupplierId = (name?: string | null) => getOrCreateByName(brandIdCache, prisma.supplier, name)
export const getManufacturerId = (name?: string | null) => getOrCreateByName(brandIdCache, prisma.manufacturer, name)

export const clearCache = () => {
    brandIdCache.clear();
    categoryIdCache.clear();
    manufacturerIdCache.clear();
    supplierIdCache.clear();
}