import ICreateRentalDTO from "../dtos/ICreateRentalDTO";
import Rental from "../infra/typeorm/entities/Rental";


interface IRentalsRepository {
    create({ car_id, user_id, expected_return_date }: ICreateRentalDTO): Promise<Rental>
    findOpenRentalByCar(car_id: string): Promise<Rental>;
    findOpenRentalByUser(user_id: string): Promise<Rental>;
}

export default IRentalsRepository;