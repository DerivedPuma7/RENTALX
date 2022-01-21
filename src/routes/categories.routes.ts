import { Router } from 'express';
import CategoriesRepository from '../modules/cars/repositories/CategoriesRepositories';
import CreateCategoryService from '../modules/cars/services/CreateCategoryService';

const categoriesRoutes = Router();
const categoriesRepository = new CategoriesRepository();

categoriesRoutes.post('/', (request, response) => {
   const { name, description } = request.body;

   const createCategoriesService = new CreateCategoryService(categoriesRepository);

   createCategoriesService.execute({ name, description });

   return response.status(201).send();
});

categoriesRoutes.get('/', (request, response) => {
   const categories = categoriesRepository.list();

   return response.status(201).json(categories);
});

export default categoriesRoutes;