import dayjs from "dayjs";
import RentalsRepositoryInMemory from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import AppError from "@shared/errors/AppError";
import CreateRentalUseCase from "./CreateRentalUseCase";
import DayJsDateProvider from "@shared/container/providers/DateProvider/implementations/DayJsDateProvider";
import CarsRepositoryInMemory from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory
let carsRepositoryInMemory: CarsRepositoryInMemory
let dayJsDateProvider: DayJsDateProvider;

describe("Create Rental", () => {
    const dayAdded24Hours = dayjs().add(1, "day").toDate();

    beforeEach(() => {
        rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
        dayJsDateProvider = new DayJsDateProvider();
        carsRepositoryInMemory = new CarsRepositoryInMemory()
        createRentalUseCase = new CreateRentalUseCase(rentalsRepositoryInMemory, dayJsDateProvider, carsRepositoryInMemory);
    });

    it("should be able to create a new rental", async () => {
        const car = await carsRepositoryInMemory.create({ 
            brand: "brand", 
            category_id: '123', 
            daily_rate: 100, 
            fine_amount: 40,
            description: "car test", 
            name: "test", 
            license_plate: 'test',
        });

        const rental = await createRentalUseCase.execute({
            car_id: car.id,
            user_id: "123456",
            expected_return_date: dayAdded24Hours
        });

        expect(rental).toHaveProperty("id");
        expect(rental).toHaveProperty("start_date");
    });

    it("should not be able to create a new rental if there is another one open to the same user", async () => {
        const car = await carsRepositoryInMemory.create({ 
            brand: "brand", 
            category_id: '123', 
            daily_rate: 100, 
            fine_amount: 40,
            description: "car test", 
            name: "test", 
            license_plate: 'test',
        });

        const user_id = "12345";
        await createRentalUseCase.execute({
            car_id: car.id,
            user_id,
            expected_return_date: dayAdded24Hours
        });

        expect(createRentalUseCase
            .execute({
                car_id: "456789",
                user_id,
                expected_return_date: dayAdded24Hours
            })
        ).rejects.toEqual(new AppError("User already have an open rental"));
    });

    it("should not be able to create a new rental if there is another one open to the same car", async () => {
        const car = await carsRepositoryInMemory.create({ 
            brand: "brand", 
            category_id: '123', 
            daily_rate: 100, 
            fine_amount: 40,
            description: "car test", 
            name: "test", 
            license_plate: 'test same car',
        });

        const car_id = car.id;

        await createRentalUseCase.execute({
            car_id,
            user_id: "123456",
            expected_return_date: dayAdded24Hours
        });

        expect(createRentalUseCase
            .execute({
                car_id,
                user_id: "123456",
                expected_return_date: dayAdded24Hours
            })
        ).rejects.toEqual(new AppError("Car is not available"));
    });

    it("should not be able to create a new rental with invalid return date", async () => {
        expect(createRentalUseCase
            .execute({
                car_id: "987654",
                user_id: "123456",
                expected_return_date: dayjs().toDate()
            })
        ).rejects.toEqual(new AppError("Rental must long at least 24 hours!"));
    });

});