import RentalsRepositoryInMemory from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import AppError from "@shared/errors/AppError";
import CreateRentalUseCase from "./CreateRentalUseCase";

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory

describe("Create Rental", () => {
    
    beforeEach(() => {
        rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
        createRentalUseCase = new CreateRentalUseCase(rentalsRepositoryInMemory);
    });

    it("should be able to create a new rental", async () => {
        const rental = await createRentalUseCase.execute({
            car_id: "123456",
            user_id: "552231",
            expected_return_date: new Date()
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
                expected_return_date: new Date()
            });
            const rental = await createRentalUseCase.execute({
                car_id: "456789",
                user_id,
                expected_return_date: new Date()
            });
        }).rejects.toBeInstanceOf(AppError);
    });

    it("should not be able to create a new rental if there is another one open to the same car", async () => {
        
        expect(async () => {
            const car_id = "12345";
            await createRentalUseCase.execute({
                car_id,
                user_id: "123456",
                expected_return_date: new Date()
            });
            const rental = await createRentalUseCase.execute({
                car_id,
                user_id: "123456",
                expected_return_date: new Date()
            });
        }).rejects.toBeInstanceOf(AppError);
    });

});