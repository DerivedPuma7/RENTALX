import { Request, Response } from "express";
import ListCategoriesUseCase from "./ListCategoriesUseCase";
import { container } from "tsyringe";

class ListCategoriesController{

   async handle(request: Request, response: Response): Promise<Response>{

      const listCategoriesUseCase = container.resolve(ListCategoriesUseCase);

      try {
         const all = await listCategoriesUseCase.execute();
         return response.status(201).json(all);
      } catch (error) {
         return response.status(400).send(error);
      }

   };
}

export default ListCategoriesController;