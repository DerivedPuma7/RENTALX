import { Router } from 'express';
import Category from '../modules/cars/model/Category';
import CategoriesRepository from '../modules/cars/repositories/CategoriesRepositories';
import CreateCategoryService from '../modules/cars/services/CreateCategoryService';

const categoriesRoutes = Router();
const categoriesRepository = new CategoriesRepository();

const categories: Category[] = [];

categoriesRoutes.post('/', (request, response) => {
   const { name, description } = request.body;

   const createCategoriesService = new CreateCategoryService(categoriesRepository);

   createCategoriesService.execute({ name, description });

   // Essa parte comentada a seguir não é responsabilidade da rota de fazer. Vamos criar 
   // outra camada (Service) para lidar com a verificação e a inserção de uma nova categoria
   // const categoryAlreadyExists = categoriesRepository.findByName(name);
   // if (categoryAlreadyExists) {
   //    return response.status(400).json({ error: "Category already exists" });
   // }
   // categoriesRepository.create({ name, description });

   return response.status(201).send();
});

categoriesRoutes.get('/', (request, response) => {
   const categories = categoriesRepository.list();

   return response.status(201).json(categories);
});

export default categoriesRoutes;