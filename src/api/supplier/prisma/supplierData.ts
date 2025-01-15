
import { prisma } from "../../../middleware/prisma";

export const createSupplier = async (name: string) => {
  try {
    const supplier = await prisma.supplier.create({
      data: {
        name
      }
    })
    return supplier
  } catch (error) {
    console.error("Error creating supplier:", error);
    throw error;
  }
}

export const getAllSuppliers = async () => {
  try {
    const allSuppliers = await prisma.supplier.findMany()

    return allSuppliers
  } catch (error) {
    console.error("Error fetching suppliers:", error);
    throw error;
  }
}

export const getSupplierById = async (id: number) => {
  try {
    const supplier = await prisma.supplier.findUnique({
      where: {
        id,
      }
    })
    return supplier
  } catch (error) {
    console.error("Error fetching supplier:", error);
    throw error;
  }
}

export const deleteSupplierById = async (id: number) => {
  try {
    const deletedSupplier = await prisma.supplier.delete({
      where: {
        id: id
      }
    })
  } catch (error) {
    console.error("Error deleting supplier:", error);
    throw error;
  }
} 

export const editSupplierById = async (id: number, name: string) => {
  const supplier = await getSupplierById(id);

  if (!supplier) {
    throw new Error("no supplier id found")
  }

  try {
    const editedSupplier = await prisma.supplier.update({
      where: {
        id: supplier.id
      },
      data:{
        name: name
      }
    })
    return editedSupplier
  } catch (error) {
    console.error("Error editing supplier:", error);
    throw error;
  }
}