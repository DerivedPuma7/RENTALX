import { ICreateSpecificationDTO, ISpecificationsRepository } from '@modules/cars/repositories/ISpecificationsRepository';
import { getRepository, Repository } from 'typeorm';
import Specification from '../entities/Specification';
import CategoriesRepository from './CategoriesRepository';

class SpecificationsRepository implements ISpecificationsRepository {
   private repository: Repository<Specification>;

   private static INSTANCE: SpecificationsRepository;

   constructor() {
      this.repository = getRepository(Specification);
   }

   async create({ name, description }: ICreateSpecificationDTO): Promise<void> {
      const specification = this.repository.create({
         name,
         description
      });

      await this.repository.save(specification);
   }

   async findByName(name: string): Promise<Specification> {
      const specification = this.repository.findOne({name});
      return specification;
   }

}

export default SpecificationsRepository;