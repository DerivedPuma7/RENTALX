import { container } from "tsyringe";

//categories
import { ICategoriesRepository } from "@modules/cars/repositories/ICategoriesRepository";
import CategoriesRepository from "@modules/cars/infra/typeorm/repositories/CategoriesRepository";

//specifications
import { ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationsRepository";
import SpecificationsRepository from "@modules/cars/infra/typeorm/repositories/SpecificationsRepository";

//users
import IUsersRepository from "@modules/account/repositories/IUsersRepository";
import UsersRepository from "@modules/account/infra/typeorm/repositories/UsersRepository";

//cars
import ICarsRepository from "@modules/cars/repositories/ICarsRepository";
import CarsRepository from "@modules/cars/infra/typeorm/repositories/CarsRepository";

container.registerSingleton<ICategoriesRepository>(
    "CategoriesRepository",
    CategoriesRepository
);

container.registerSingleton<ISpecificationsRepository>(
    "SpecificationsRepository",
    SpecificationsRepository
);

container.registerSingleton<IUsersRepository>(
    "UsersRepository",
    UsersRepository
);

container.registerSingleton<ICarsRepository>(
    "CarsRepository",
    CarsRepository
);