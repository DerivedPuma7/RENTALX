import { container } from "tsyringe";

//categories
import { ICategoriesRepository } from "../../modules/cars/repositories/ICategoriesRepository";
import CategoriesRepository from "../../modules/cars/repositories/implementations/CategoriesRepository";

//specifications
import { ISpecificationsRepository } from "../../modules/cars/repositories/ISpecificationsRepository";
import SpecificationsRepository from "../../modules/cars/repositories/implementations/SpecificationsRepository";

//users
import IUsersRepository from "../../modules/account/repositories/IUsersRepository";
import UsersRepository from "../../modules/account/repositories/implementations/UsersRepository";

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