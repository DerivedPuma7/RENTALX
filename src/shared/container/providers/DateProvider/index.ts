import { container } from "tsyringe";

//date provider
import IDateProvider from "./IDateProvider";
import DayJsDateProvider from "./implementations/DayJsDateProvider";

container.registerSingleton<IDateProvider>(
    "DayJsDateProvider",
    DayJsDateProvider
);