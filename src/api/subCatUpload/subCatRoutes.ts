import express from 'express'
import { uploadCsv } from '../../middleware/multer'
import { getSubCategories, uploadSales } from './subCatController'

const router = express.Router()

router.post('/sub-category/upload', uploadCsv.single('csvFile'), uploadSales);
router.get('/api/sub-category/table', getSubCategories);

export default router;