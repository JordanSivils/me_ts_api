import multer, { Multer } from "multer";

export const memUpload = (): Multer => {
   return multer({ storage: multer.memoryStorage() })
}

