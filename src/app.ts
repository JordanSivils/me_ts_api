import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import compression from 'compression'
import seedRouter from '../src/api/seeding/seedingRoutes';
import subCatRouter from '../src/api/subCatUpload/subCatRoutes';
import combinedCategoryRouter from '../src/api/combinedCategory/combinedRoutes';
import categoryRouter from '../src/api/category/categoryRoutes';
import queryRouter from '../src/api/queryBuild/queryRoutes';
import supplierRouter from '../src/api/supplier/supplierRoutes'

const app = express();
const port = 3999;

app.use(express.json());
app.use(compression());
app.use(cors());

app.use(seedRouter);
app.use(subCatRouter)
app.use(combinedCategoryRouter)
app.use(categoryRouter);
app.use(queryRouter);
app.use(supplierRouter);

app.listen(port, () => {
  console.log(`port ${port} running`)
})