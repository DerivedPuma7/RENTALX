import { Router } from 'express';
import multer from 'multer';

import CreateCategoryController from '../modules/cars/useCases/createCategory/createCategoryController';
import { listCategoriesController } from '../modules/cars/useCases/listCategories';
import ImportCategoryController from '../modules/cars/useCases/importCategory/ImportCategoryController';

const categoriesRoutes = Router();

const upload = multer({
   dest: "./tmp"
});

const createCategoryController = new CreateCategoryController();
const importCategoryController = new ImportCategoryController();

categoriesRoutes.post('/', createCategoryController.handle);

categoriesRoutes.get('/', (request, response) => {
   return listCategoriesController.handle(request, response);
});

categoriesRoutes.post("/import", upload.single("file"), importCategoryController.handle)

export default categoriesRoutes;