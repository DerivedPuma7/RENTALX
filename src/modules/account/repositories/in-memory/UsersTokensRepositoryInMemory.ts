import ICreateUsersTokensDTO from "@modules/account/dtos/ICreateUsersTokensDTO";
import UsersTokens from "@modules/account/infra/typeorm/entities/UsersTokens";
import IUsersTokensRepository from "../IUsersTokensRepository";

class UsersTokensRepositoryInMemory implements IUsersTokensRepository{
    usersTokens: UsersTokens[] = [];

    async create({ user_id, expires_date, refresh_token }: ICreateUsersTokensDTO): Promise<UsersTokens> {
        const userToken = new UsersTokens();

        Object.assign(userToken, { 
            user_id, 
            expires_date, 
            refresh_token 
        });

        this.usersTokens.push(userToken);

        return userToken;
    }
    
    async findByUserIdAndRefreshToken(user_id: string, refresh_token: string): Promise<UsersTokens> {
        const userToken = this.usersTokens.find((token) => {
            token.user_id === user_id && token.refresh_token === refresh_token
        });

        return userToken;
    }
    
    async deleteById(id: string): Promise<void> {
        const userToken = this.usersTokens.find((token) => {
            token.id === id
        });

        const indexOfTokenToDelete = this.usersTokens.indexOf(userToken);
        this.usersTokens.splice(indexOfTokenToDelete);
    }
    
    async findByRefreshToken(refresh_token: string): Promise<UsersTokens> {
        const userToken = this.usersTokens.find((token) => {
            token.refresh_token === refresh_token
        });

        return userToken;
    }
}

export default UsersTokensRepositoryInMemory;