import IUsersRepository from "@modules/account/repositories/IUsersRepository";
import IUsersTokensRepository from "@modules/account/repositories/IUsersTokensRepository";
import IDateProvider from "@shared/container/providers/DateProvider/IDateProvider";
import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { hash } from "bcryptjs";

interface IRequest {
    refresh_token: string;
    password: string;
}

@injectable()
class ResetPasswordUserUseCase {
    constructor(
        @inject("UsersTokensRepository")
        private usersTokensRepository: IUsersTokensRepository,
        @inject("UsersRepository")
        private usersRepository: IUsersRepository,
        @inject("DayJsDateProvider")
        private dateProvider: IDateProvider
    ) {}

    async execute({ refresh_token, password }: IRequest): Promise<void> {
        console.log('refresh_token usecase', refresh_token);
        const userToken = await this.usersTokensRepository.findByRefreshToken(refresh_token);

        if (!userToken) {
            throw new AppError("Invalid token!");
        }

        const dateNow = this.dateProvider.dateNow();
        const tokenExpiresDate = userToken.expires_date;
        const is_valid_token = this.dateProvider.compareIfBefore(tokenExpiresDate, dateNow);

        if(is_valid_token) {
            throw new AppError("Token expired!");
        }

        const userId = userToken.user_id;
        const user = await this.usersRepository.findById(userId);
        user.password = await hash(password, 8);

        // await this.usersRepository.create(user),
        // await this.usersTokensRepository.deleteById(userToken.id)

        await Promise.all([
            this.usersRepository.create(user),
            this.usersTokensRepository.deleteById(userToken.id)
        ]);
    }
}

export default ResetPasswordUserUseCase;