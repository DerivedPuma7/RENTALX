import { describe, beforeEach, expect, it } from "@jest/globals";
import AppError from "@shared/errors/AppError";
import ICreateUserDTO from "@modules/account/dtos/ICreateUserDTO";
import UsersRepositoryInMemory from "@modules/account/repositories/in-memory/UsersRepositoryInMemory";
import AuthenticateUserUseCase from "./AuthenticateUserUseCase";
import CreateUserUseCase from "../createUser/CreateUserUseCase";
import UsersTokensRepositoryInMemory from "@modules/account/repositories/in-memory/UsersTokensRepositoryInMemory";
import IDateProvider from "@shared/container/providers/DateProvider/IDateProvider";
import DayJsDateProvider from "@shared/container/providers/DateProvider/implementations/DayJsDateProvider";

let authenticateUserUseCase: AuthenticateUserUseCase;
let usersResositoryInMemory: UsersRepositoryInMemory;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;
let dateProvider: IDateProvider;

describe("Authenticate User", () => {
    beforeEach(() => {
        usersResositoryInMemory = new UsersRepositoryInMemory();
        usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
        dateProvider = new DayJsDateProvider()
        authenticateUserUseCase = new AuthenticateUserUseCase(usersResositoryInMemory, usersTokensRepositoryInMemory, dateProvider);
        createUserUseCase = new CreateUserUseCase(usersResositoryInMemory);
    });

    it("should be able to authenticate an user", async () => {
        const user: ICreateUserDTO = {
            driver_license: "00123",
            email: "user@test.com",
            password: "12345",
            name: "name test"
        }

        await createUserUseCase.execute(user);

        const result = await authenticateUserUseCase.execute({
            email: user.email,
            password: user.password
        });

        expect(result).toHaveProperty("token");
    });

    it("should not be able to authenticate an nonexistent user", async () => {
        await expect(authenticateUserUseCase
            .execute({
                email: "false@email.com",
                password: "12345"
            })
        ).rejects.toEqual(new AppError("Email or password incorrect"));
    });

    it("should not be able to authenticate with incorrect password", async () => {
        const user: ICreateUserDTO = {
            driver_license: "54624",
            email: "falseuser@test.com",
            password: "correctpassword",
            name: "username test"
        }

        await createUserUseCase.execute(user);

        await expect(authenticateUserUseCase
            .execute({
                email: user.email,
                password: "incorrectpassword"
            })
        ).rejects.toEqual(new AppError("Email or password incorrect"));
    })
})