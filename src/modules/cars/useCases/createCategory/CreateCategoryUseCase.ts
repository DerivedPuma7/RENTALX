import { inject, injectable } from 'tsyringe';
import AppError from '@errors/AppError';

import { ICategoriesRepository } from '@modules/cars/repositories/ICategoriesRepository';

interface IRequest {
   name: string;
   description: string;
}

/**
 * [x] - Definir o tipo de retorno
 * [x] - Alterar o retorno de erro
 * [x] - Acessar o repositorio
 */
@injectable()
class CreateCategoryUseCase {
   constructor(@inject('CategoriesRepository') private categoriesRepository: ICategoriesRepository) { }

   async execute({ name, description }: IRequest): Promise<void> {
      const categoryAlreadyExists = await this.categoriesRepository.findByName(name);

      if (categoryAlreadyExists) {
         throw new AppError('Category already exists', 400);
      }

      this.categoriesRepository.create({ name, description });
   }
}

export default CreateCategoryUseCase;