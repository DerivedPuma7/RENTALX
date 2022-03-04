import { Request, Response } from 'express';
import CreateCategoryUseCase from './CreateCategoryUseCase';
import { container } from "tsyringe";


class CreateCategoryController {

   async handle(request: Request, response: Response): Promise<Response> {
      const { name, description } = request.body;

      const createCategoryUseCase = container.resolve(CreateCategoryUseCase);

      try {
         await createCategoryUseCase.execute({ name, description });
      } catch (error) {
         return response.status(400).json({'message': 'Category already exists'});
      }

      return response.status(201).send();
   }
}

export default CreateCategoryController;