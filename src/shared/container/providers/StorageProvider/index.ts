import { container } from "tsyringe";

// storage provider
import LocalStorageProvider from "./implementations/LocalStorageProvider";
import S3StorageProvider from "./implementations/S3StorageProvider";
import IStorageProvider from "./IStorageProvider";

const diskStorage = {
    local: LocalStorageProvider,
    s3: S3StorageProvider
};

container.registerSingleton<IStorageProvider>(
    "StorageProvider",
    diskStorage[process.env.disk]
);