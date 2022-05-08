import Specification from "@modules/cars/infra/typeorm/entities/Specification";
import { ICreateSpecificationDTO, ISpecificationsRepository } from "../ISpecificationsRepository";

class SpecificationsRepositoryInMemory implements ISpecificationsRepository {
    specifications: Specification[] = [];

    async create({ name, description }: ICreateSpecificationDTO): Promise<Specification> {
        const especification = new Specification();

        Object.assign(especification, {
            name, 
            description
        });

        this.specifications.push(especification);

        return especification;
    }

    async findByName(name: string): Promise<Specification> {
        return this.specifications.find(especification => especification.name === name);
    }

    async findByIds(ids: string[]): Promise<Specification[]> {
        const especifications = this.specifications.filter((especification) =>
            ids.includes(especification.id)
        );

        return especifications;
    }
}

export default SpecificationsRepositoryInMemory;