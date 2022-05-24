// import { describe, beforeEach, expect, it } from "@jest/globals";

import AppError from "@shared/errors/AppError";
import CategoriesRepositoryInMemory from "@modules/cars/repositories/in-memory/CategoriesRepositoryInMemory";
import CreateCategoryUseCase from "./CreateCategoryUseCase";

let createCategoryUseCase: CreateCategoryUseCase;
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;

describe("Create Category", () => {

    beforeEach(() => {
        categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
        createCategoryUseCase = new CreateCategoryUseCase(categoriesRepositoryInMemory);
    });

    it("should be able to create a new category", async () => {
        const category = {
            name: "Category test",
            description: "Category description test"
        }

        await createCategoryUseCase.execute(category);

        const createdCategory = await categoriesRepositoryInMemory.findByName(category.name);

        expect(createdCategory).toHaveProperty("id");
    });

    it("should not be able to create a new category with same name", async () => {
        const category = {
            name: "Category test",
            description: "Category description test"
        }

        await createCategoryUseCase.execute(category);

        await expect(createCategoryUseCase
            .execute(category)
        ).rejects.toEqual(new AppError("Category already exists"));

    });
})