import ICreateUsersTokensDTO from "../dtos/ICreateUsersTokensDTO";
import UsersTokens from "../infra/typeorm/entities/UsersTokens";

interface IUsersTokensRepository {
    create({ user_id, expires_date, refresh_token}: ICreateUsersTokensDTO): Promise<UsersTokens>;
}

export default IUsersTokensRepository;