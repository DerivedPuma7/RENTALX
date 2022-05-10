import Rental from "@modules/rentals/infra/typeorm/entities/Rental";
import IRentalsRepository from "@modules/rentals/repositories/IRentalsRepository";
import AppError from "@shared/errors/AppError";
import { injectable } from "tsyringe";


interface IRequest {
    car_id: string;
    user_id: string;
    expected_return_date: Date;
}

// @injectable()
class CreateRentalUseCase {
    constructor(
        private rentalsRepository: IRentalsRepository
    ) {}


    async execute({ car_id, user_id, expected_return_date }: IRequest): Promise<Rental> {
        const rentalOpenToCar = await this.rentalsRepository.findOpenRentalByCar(car_id);
        if(rentalOpenToCar) {
            throw new AppError("Car is not available");
        }

        const rentalOpenToUser = await this.rentalsRepository.findOpenRentalByUser(user_id);
        if(rentalOpenToUser) {
            throw new AppError("User already have an open rental");
        }

        const rental = await this.rentalsRepository.create({
            car_id,
            user_id,
            expected_return_date
        });

        return rental;
    }
}

export default CreateRentalUseCase;