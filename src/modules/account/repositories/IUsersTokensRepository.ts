import ICreateUsersTokensDTO from "../dtos/ICreateUsersTokensDTO";
import UsersTokens from "../infra/typeorm/entities/UsersTokens";

interface IUsersTokensRepository {
    create({ user_id, expires_date, refresh_token}: ICreateUsersTokensDTO): Promise<UsersTokens>;
    findByUserIdAndRefreshToken(user_id: string, refresh_token: string): Promise<UsersTokens>;
    deleteById(id: string): Promise<void>;
    findByRefreshToken(refresh_token: string): Promise<UsersTokens>;
}

export default IUsersTokensRepository;