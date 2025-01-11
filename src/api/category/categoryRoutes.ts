import express from 'express'
import { fetchCategoryTable } from './categoryController';

const router = express.Router();

router.get("/api/category/table", fetchCategoryTable);

export default router;