import express from 'express'
import { uploadMapping } from './seedingController';
import { uploadCsv } from '../../middleware/multer';

const router = express.Router();

router.post('/mapping/upload', uploadCsv.single('csvFile'), uploadMapping)

export default router;