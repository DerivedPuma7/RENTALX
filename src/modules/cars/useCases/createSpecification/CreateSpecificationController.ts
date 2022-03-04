import { Request, Response } from 'express';
import CreateSpecificationUseCase from './CreateSpecificationUseCase';

import { container } from "tsyringe";

class CreateSpecificationController{

    async handle(request: Request, response: Response): Promise<Response>{
        const { name, description } = request.body;

        const createSpecificationUseCase = container.resolve(CreateSpecificationUseCase);

        try {
            await createSpecificationUseCase.execute({name, description});
        } catch (error) {
            return response.status(400).json({"message": "Specification Already Exists"});
        }

        return response.status(201).send();
    }
}


export default CreateSpecificationController;