import dayjs from "dayjs";
import RentalsRepositoryInMemory from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import AppError from "@shared/errors/AppError";
import CreateRentalUseCase from "./CreateRentalUseCase";
import DayJsDateProvider from "@shared/container/providers/DateProvider/implementations/DayJsDateProvider";

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory
let dayJsDateProvider: DayJsDateProvider;

describe("Create Rental", () => {
    const dayAdded24Hours = dayjs().add(1, "day").toDate();

    beforeEach(() => {
        rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
        dayJsDateProvider = new DayJsDateProvider();
        createRentalUseCase = new CreateRentalUseCase(rentalsRepositoryInMemory, dayJsDateProvider);
    });

    it("should be able to create a new rental", async () => {
        const rental = await createRentalUseCase.execute({
            car_id: "123456",
            user_id: "552231",
            expected_return_date: dayAdded24Hours
        });

        expect(rental).toHaveProperty("id");
        expect(rental).toHaveProperty("start_date");
    });

    it("should not be able to create a new rental if there is another one open to the same user", async () => {
        expect(async () => {
            const user_id = "12345";
            await createRentalUseCase.execute({
                car_id: "123456",
                user_id,
                expected_return_date: dayAdded24Hours
            });
            const rental = await createRentalUseCase.execute({
                car_id: "456789",
                user_id,
                expected_return_date: dayAdded24Hours
            });
        }).rejects.toBeInstanceOf(AppError);
    });

    it("should not be able to create a new rental if there is another one open to the same car", async () => {
        expect(async () => {
            const car_id = "12345";
            await createRentalUseCase.execute({
                car_id,
                user_id: "123456",
                expected_return_date: dayAdded24Hours
            });
            const rental = await createRentalUseCase.execute({
                car_id,
                user_id: "123456",
                expected_return_date: dayAdded24Hours
            });
        }).rejects.toBeInstanceOf(AppError);
    });

    it("should not be able to create a new rental with invalid return date", async () => {
        expect(async () => {
            const rental = await createRentalUseCase.execute({
                car_id: "987654",
                user_id: "123456",
                expected_return_date: dayjs().toDate()
            });
        }).rejects.toBeInstanceOf(AppError);
    });

});