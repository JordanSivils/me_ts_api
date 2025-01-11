import multer from 'multer'

const storage = multer.memoryStorage()

export const uploadCsv = multer({ dest: 'uploads/'});
export const uploadImage = multer({ storage: storage})


