import IUserResponseDTO from "@modules/account/dtos/IUserResponseDTO";
import UserMap from "@modules/account/mapper/UserMap";
import IUsersRepository from "@modules/account/repositories/IUsersRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class ProfileUserUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ) {}

    async execute(id: string): Promise<IUserResponseDTO> {
        const user = await this.usersRepository.findById(id);

        return UserMap.toDTO(user);
    }
}

export default ProfileUserUseCase;