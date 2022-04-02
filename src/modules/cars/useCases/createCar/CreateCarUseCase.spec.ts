import CarsRepositoryInMemory from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import AppError from "@shared/errors/AppError";
import CreateCarUseCase from "./CreateCarUseCase"

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Create car", () => {

    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
    });

    it("should be able to create a new car", async () => {
        const car = { 
            name: "name car", 
            description: "description car", 
            daily_rate: 100, 
            license_plate: "ABC-1234", 
            fine_amount: 60, 
            brand: "brand car", 
            category_id: "category_id" 
        };

        const createdCar = await createCarUseCase.execute(car);

        expect(createdCar).toHaveProperty("id");

    });

    it("should not be able to create a car that already exists", () => {
        expect(async () => {
            const car = { 
                name: "name car", 
                description: "description car", 
                daily_rate: 100, 
                license_plate: "ABC-1234", 
                fine_amount: 60, 
                brand: "brand car", 
                category_id: "category_id" 
            };
    
            await createCarUseCase.execute(car);
            await createCarUseCase.execute(car);
        }).rejects.toBeInstanceOf(AppError);
    });

    it("should be able to create a car with available status by default", async () => {
        const car = { 
            name: "name car available", 
            description: "description car", 
            daily_rate: 100, 
            license_plate: "ABCD-1234", 
            fine_amount: 60, 
            brand: "brand car", 
            category_id: "category_id" 
        };

        const createdCar = await createCarUseCase.execute(car);

        expect(createdCar.available).toBe(true);
    });

});