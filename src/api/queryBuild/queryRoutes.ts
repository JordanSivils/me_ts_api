import express from 'express';
import { fetchAggregateSalesData, fetchSalesData, fetchTimeSeriesSalesData } from './queryController';
const router = express.Router()

router.get("/api/sales/query", fetchSalesData);
router.get("/api/aggregate/sales-data", fetchAggregateSalesData);
router.get("/api/sales/timeseries", fetchTimeSeriesSalesData);

export default router;