import express from 'express'
import { uploadCsv } from '../../middleware/multer'
import { findNullCC, findSubCategory, getSubCategories, uploadSales } from './subCatController'

const router = express.Router()

router.post('/sub-category/upload', uploadCsv.single('csvFile'), uploadSales);
router.get('/api/sub-category/table', getSubCategories);
router.get('/api/sub-category/:name', findSubCategory);
router.get('/api/sub-cat/no-cc', findNullCC);

export default router;