import ICarsRepository from "@modules/cars/repositories/ICarsRepository";
import Rental from "@modules/rentals/infra/typeorm/entities/Rental";
import IRentalsRepository from "@modules/rentals/repositories/IRentalsRepository";
import IDateProvider from "@shared/container/providers/DateProvider/IDateProvider";
import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

interface IRequest {
    id: string;
    user_id: string;
}

@injectable()
class DevolutionRentalUseCase {
    constructor(
        @inject("RentalsRepository")
        private rentalsRepository: IRentalsRepository,
        @inject("CarsRepository")
        private carsRepository: ICarsRepository,
        @inject("DayJsDateProvider")
        private dateProvider: IDateProvider
    ) {}

    async execute({ id, user_id }: IRequest): Promise<Rental> {
        const rental = await this.rentalsRepository.findById(id);
        const car = await this.carsRepository.findById(rental.car_id);
        const minimumDaily = 1;
        let total = 0;

        if(!rental) {
            throw new AppError("Rental does not exists!");
        }

        if(rental.end_date) {
            throw new AppError("Rental already closed!");
        }

        const dateNow = this.dateProvider.dateNow();
        const rentalStartDate = rental.start_date;
        const expected_return_date = rental.expected_return_date;

        let daily = this.dateProvider.compareInDays(rentalStartDate, dateNow);
        if(daily <= 0) {
            daily = minimumDaily;
        }

        const delay = this.dateProvider.compareInDays(dateNow, expected_return_date);
        const timestampAtual = this.dateProvider.getTimestamp(dateNow);
        const timestampExpectedReturnDate = this.dateProvider.getTimestamp(expected_return_date);
        if(delay > 0 && (timestampAtual > timestampExpectedReturnDate) ) {
            const calculateFine = delay * car.fine_amount;
            total = calculateFine;
        }

        total += daily * car.daily_rate;
        rental.end_date = this.dateProvider.dateNow();
        rental.total = total;

        await this.rentalsRepository.create(rental);
        const available = true;
        await this.carsRepository.updateAvailable(car.id, available);

        return rental
    }
}

export default DevolutionRentalUseCase;