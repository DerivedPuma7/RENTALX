import CarsRepositoryInMemory from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import ListAvailableCarsUseCase from "./ListAvailableCarsUseCase";

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List Cars", () => {

    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        listAvailableCarsUseCase = new ListAvailableCarsUseCase(carsRepositoryInMemory);
    })

    it("should be able to list all available cars", async () => {
        const car1 = await carsRepositoryInMemory.create({
            name: "Car1",
            description: "car desc",
            daily_rate: 100,
            license_plate: "ABC-1234",
            fine_amount: 50,
            brand: "brand",
            category_id: "any_category"
        });
        const car2 = await carsRepositoryInMemory.create({
            name: "Car2",
            description: "car desc",
            daily_rate: 100,
            license_plate: "CBA-4321",
            fine_amount: 50,
            brand: "brand",
            category_id: "any_category"
        });

        const cars = await listAvailableCarsUseCase.execute({});

        expect(cars).toEqual([car1, car2]);
    });

    it("should be able to list all available cars by name", async () => {
        const car1 = await carsRepositoryInMemory.create({
            name: "Car1",
            description: "car desc",
            daily_rate: 100,
            license_plate: "CBA-4321",
            fine_amount: 50,
            brand: "car_brand_test",
            category_id: "any_category"
        });
        

        const cars = await listAvailableCarsUseCase.execute({
            name: "Car1"
        });

        expect(cars).toEqual([car1]);
    });

    it("should be able to list all available cars by brand", async () => {
        const car1 = await carsRepositoryInMemory.create({
            name: "Car1",
            description: "car desc",
            daily_rate: 100,
            license_plate: "CBA-4321",
            fine_amount: 50,
            brand: "car_brand_test",
            category_id: "any_category"
        });
        

        const cars = await listAvailableCarsUseCase.execute({
            brand: "car_brand_test"
        });

        expect(cars).toEqual([car1]);
    });

    it("should be able to list all available cars by category", async () => {
        const car1 = await carsRepositoryInMemory.create({
            name: "Car1",
            description: "car desc",
            daily_rate: 100,
            license_plate: "CBA-4321",
            fine_amount: 50,
            brand: "car_brand_test",
            category_id: "any_category"
        });
        

        const cars = await listAvailableCarsUseCase.execute({
            category_id: "any_category"
        });

        expect(cars).toEqual([car1]);
    });
});