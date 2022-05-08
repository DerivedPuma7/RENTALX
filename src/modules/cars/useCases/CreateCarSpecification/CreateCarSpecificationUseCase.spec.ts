import CarsRepositoryInMemory from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import SpecificationsRepositoryInMemory from "@modules/cars/repositories/in-memory/SpecificationsRepositoryInMemory";
import AppError from "@shared/errors/AppError";
import CreateCarSpecificationUseCase from "./CreateCarSpecificationUseCase"

let carsRepositoryInMemory: CarsRepositoryInMemory;
let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let specificationsRepositoryInMemory: SpecificationsRepositoryInMemory;

describe("Create Car Specification", () => {

    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        specificationsRepositoryInMemory = new SpecificationsRepositoryInMemory();
        createCarSpecificationUseCase = new CreateCarSpecificationUseCase(carsRepositoryInMemory, specificationsRepositoryInMemory);
    });

    it("should not be able to add a new specification to a non existing car", async () => {
        expect(async () => {
            const car_id = "1234";
            const specifications_id = ["54321"];

            await createCarSpecificationUseCase.execute({ car_id, specifications_id });
        }).rejects.toBeInstanceOf(AppError);
    });

    it("should be able to add a new specification to the car", async () => {
        const car = await carsRepositoryInMemory.create({ 
            name: "name car", 
            description: "description car", 
            daily_rate: 100, 
            license_plate: "ABC-1234", 
            fine_amount: 60, 
            brand: "brand car", 
            category_id: "category_id" 
        });

        const especification = await specificationsRepositoryInMemory.create({
            description: "description test 1",
            name: "name test 1"
        });
        const especification2 = await specificationsRepositoryInMemory.create({
            description: "description test 2",
            name: "name test 2"
        });

        const car_id = car.id;
        const specifications_id = [especification.id, especification2.id];

        const specificationsCars = await createCarSpecificationUseCase.execute({ car_id, specifications_id });

        expect(specificationsCars).toHaveProperty("specifications");
        expect(specificationsCars.specifications.length).toBe(2);

    });
})