import express from 'express'
import { fetchCombinedCategorySales } from './combinedConroller';

const router = express.Router();

router.get("/api/combined-category/table", fetchCombinedCategorySales)

export default router;