import { container } from "tsyringe";

import "@shared/container/providers";

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

//cars images
import ICarsImageRepository from "@modules/cars/repositories/ICarsImageRepository";
import CarsImageRepository from "@modules/cars/infra/typeorm/repositories/CarsImageRepository";

//rentals
import IRentalsRepository from "@modules/rentals/repositories/IRentalsRepository";
import RentalsRepository from "@modules/rentals/infra/typeorm/repositories/RentalsRepository";

//users_tokens
import IUsersTokensRepository from "@modules/account/repositories/IUsersTokensRepository";
import UsersTokensRepository from "@modules/account/infra/typeorm/repositories/UsersTokensRepository";

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

container.registerSingleton<ICarsImageRepository>(
    "CarsImageRepository",
    CarsImageRepository
);

container.registerSingleton<IRentalsRepository>(
    "RentalsRepository",
    RentalsRepository
);

container.registerSingleton<IUsersTokensRepository>(
    "UsersTokensRepository",
    UsersTokensRepository
);