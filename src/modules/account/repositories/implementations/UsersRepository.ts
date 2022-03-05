import ICreateUserDTO from "../../dtos/ICreateUserDTO";
import IUsersRepository from "../IUsersRepository";
import { Repository, getRepository } from "typeorm";
import User from "../../entities/User";


class UsersRepository implements IUsersRepository{
    private repository: Repository<User>;
    constructor(){
        this.repository = getRepository(User);
    }

    async create({name, email, password, driver_license}: ICreateUserDTO): Promise<void>{
        const user = this.repository.create({name, email, password, driver_license});

        await this.repository.save(user);
    }

    async findByEmail(email: string): Promise<User> {
        const user = await this.repository.findOne({ email });
        return user;
    }

}

export default UsersRepository;