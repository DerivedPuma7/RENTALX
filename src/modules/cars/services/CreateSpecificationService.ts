import ISpecificationRepository from '../repositories/ISpecificationRepository';

interface IRequest {
   name: string;
   description: string;
   car_id: string;
}

class CreateSpecificationService {
   constructor(private specificationRepository: ISpecificationRepository){}

   execute({ name, description, car_id }: IRequest): void {

   }
}

export default CreateSpecificationService;