import ICreateUsersTokensDTO from "@modules/account/dtos/ICreateUsersTokensDTO";
import IUsersTokensRepository from "@modules/account/repositories/IUsersTokensRepository";
import { getRepository, Repository } from "typeorm";
import UsersTokens from "../entities/UsersTokens";

class UsersTokensRepository implements IUsersTokensRepository {
    private repository: Repository<UsersTokens>;
    constructor(){
        this.repository = getRepository(UsersTokens);
    }

    async create({ user_id, expires_date, refresh_token }: ICreateUsersTokensDTO): Promise<UsersTokens> {
        const userToken = this.repository.create({user_id, expires_date, refresh_token});

        return await this.repository.save(userToken);
    }
    
    async findByUserIdAndRefreshToken(user_id: string, refresh_token: string): Promise<UsersTokens> {
        return await this.repository.findOne({
            user_id,
            refresh_token
        });
    }

    async deleteById(id: string): Promise<void> {
        await this.repository.delete(id);
    }

    async findByRefreshToken(refresh_token: string): Promise<UsersTokens> {
        console.log('refresh_token', refresh_token);
        const a = await this.repository.findOne({ refresh_token });
        console.log(a);
        return a;
    }
}

export default UsersTokensRepository;