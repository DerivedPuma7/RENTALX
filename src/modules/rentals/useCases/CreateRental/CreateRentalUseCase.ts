import Rental from "@modules/rentals/infra/typeorm/entities/Rental";
import IRentalsRepository from "@modules/rentals/repositories/IRentalsRepository";
import IDateProvider from "@shared/container/providers/DateProvider/IDateProvider";
import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";


interface IRequest {
    car_id: string;
    user_id: string;
    expected_return_date: Date;
}

@injectable()
class CreateRentalUseCase {
    constructor(
        @inject("RentalsRepository")
        private rentalsRepository: IRentalsRepository,
        @inject("DayJsDateProvider")
        private dateProvider: IDateProvider
    ) {}
    
    minimumRentalHours = 24;

    async execute({ car_id, user_id, expected_return_date }: IRequest): Promise<Rental> {
        const rentalOpenToCar = await this.rentalsRepository.findOpenRentalByCar(car_id);
        if(rentalOpenToCar) {
            throw new AppError("Car is not available");
        }

        const rentalOpenToUser = await this.rentalsRepository.findOpenRentalByUser(user_id);
        if(rentalOpenToUser) {
            throw new AppError("User already have an open rental");
        }

        const dateNow = this.dateProvider.dateNow();
        const compare = this.dateProvider.compareInHours(
            dateNow,
            expected_return_date
        );

        if(compare < this.minimumRentalHours) {
            throw new AppError("Rental must long at least 24 hours!");
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