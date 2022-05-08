import { Request, Response } from "express";
import { container } from "tsyringe";
import CreateCarSpecificationUseCase from "./CreateCarSpecificationUseCase";


class CreateCarSpecificationController{

    async handle(request:Request, response: Response): Promise<Response> {
        const { car_id } = request.params;
        const { specifications_id } = request.body;
        console.log(car_id);
        console.log(specifications_id);
        const createCarSpecificationUseCase = container.resolve(CreateCarSpecificationUseCase);

        const specificationsCar = await createCarSpecificationUseCase.execute({ car_id, specifications_id });

        return response.json(specificationsCar);
    }
}

export default CreateCarSpecificationController;