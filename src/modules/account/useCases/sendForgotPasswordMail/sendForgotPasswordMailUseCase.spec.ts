import UsersRepositoryInMemory from "@modules/account/repositories/in-memory/UsersRepositoryInMemory";
import UsersTokensRepositoryInMemory from "@modules/account/repositories/in-memory/UsersTokensRepositoryInMemory";
import DayJsDateProvider from "@shared/container/providers/DateProvider/implementations/DayJsDateProvider";
import MailProviderInMemory from "@shared/container/providers/MailProvider/in-memory/MailProviderInMemory";
import AppError from "@shared/errors/AppError";
import SendForgotPasswordMailUseCase from "./SendForgotPasswordMailUseCase";


let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let dateProvider: DayJsDateProvider;
let mailProvider: MailProviderInMemory;

describe("Send Forgot Email", () => {

    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
        dateProvider = new DayJsDateProvider();
        mailProvider = new MailProviderInMemory();

        sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
            usersRepositoryInMemory,
            usersTokensRepositoryInMemory,
            dateProvider,
            mailProvider
        );
    });

    it("should be able to send a forgot password email to a user", async () => {
        const sendMail = jest.spyOn(mailProvider, "sendMail");

        await usersRepositoryInMemory.create({
            driver_license: "665481",
            email: "email@test.com",
            name: "nome do user",
            password: "123456"
        });

        await sendForgotPasswordMailUseCase.execute("email@test.com");

        expect(sendMail).toHaveBeenCalled();
    });

    it("should not be able to send an email if user does not exists", async () => {
        await expect(
            sendForgotPasswordMailUseCase
            .execute("emailnaoexistente@mail.com.br")
        ).rejects.toEqual(new AppError("User does not exists!"));
    });

    it("should be able to create an user token", async () => {
        const createUserToken = jest.spyOn(usersTokensRepositoryInMemory, "create");

        await usersRepositoryInMemory.create({
            driver_license: "456127",
            email: "email@segundousuario.com.br",
            name: "nome do user aleatorio 2",
            password: "123456"
        });

        await sendForgotPasswordMailUseCase.execute("email@segundousuario.com.br");
        
        expect(createUserToken).toHaveBeenCalled();
    });

});