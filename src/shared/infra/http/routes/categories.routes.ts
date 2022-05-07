import { Router } from 'express';
import multer from 'multer';

import CreateCategoryController from '@modules/cars/useCases/createCategory/createCategoryController';
import ImportCategoryController from '@modules/cars/useCases/importCategory/ImportCategoryController';
import ListCategoriesController from '@modules/cars/useCases/listCategories/ListCategoriesController';
import { ensureAuthenticated } from "@shared/infra/http/middleweres/ensureAuthenticate";
import { ensureAdmin } from '@shared/infra/http/middleweres/ensureAdmin';

const categoriesRoutes = Router();

const upload = multer({
   dest: "./tmp"
});

const createCategoryController = new CreateCategoryController();
const importCategoryController = new ImportCategoryController();
const listCategoriesController = new ListCategoriesController();

categoriesRoutes.use(ensureAuthenticated);
categoriesRoutes.post('/', ensureAuthenticated, ensureAdmin, createCategoryController.handle);
categoriesRoutes.get('/', listCategoriesController.handle);
categoriesRoutes.post("/import", ensureAuthenticated, ensureAdmin, upload.single("file"), importCategoryController.handle)

export default categoriesRoutes;