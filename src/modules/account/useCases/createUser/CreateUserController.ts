import { Request, Response } from "express";
import { container } from "tsyringe";

import CreateUserUseCase from "./CreateUserUseCase";


class CreateUserController {

    async handle(request: Request, response: Response): Promise<Response>{
        const {name, username, email, password, driver_license} = request.body;

        const createUserUseCase = container.resolve(CreateUserUseCase);
        
        try {
            await createUserUseCase.execute({name, username, email, password, driver_license});
        } catch (error) {
            console.log(error);
            return response.status(400).send();
        }

        return response.status(201).send();
    }

}

export default CreateUserController;