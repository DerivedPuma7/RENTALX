import { container } from "tsyringe";

//date provider
import IDateProvider from "./DateProvider/IDateProvider";
import DayJsDateProvider from "./DateProvider/implementations/DayJsDateProvider";

//mail provider
import IMailProvider from "./MailProvider/IMailProvider";
import EtherealMailProvider from "./MailProvider/implementations/EtherealMailProvider";

// local storage provider
import LocalStorageProvider from "./StorageProvider/implementations/LocalStorageProvider";
import IStorageProvider from "./StorageProvider/IStorageProvider";
import S3StorageProvider from "./StorageProvider/implementations/S3StorageProvider";

container.registerSingleton<IDateProvider>(
    "DayJsDateProvider",
    DayJsDateProvider
);

container.registerInstance<IMailProvider>(
    "EtherealMailProvider",
    new EtherealMailProvider()
);

const diskStorage = {
    local: LocalStorageProvider,
    s3: S3StorageProvider
};

container.registerSingleton<IStorageProvider>(
    "StorageProvider",
    diskStorage[process.env.disk]
);