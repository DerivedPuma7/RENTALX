import upload from "@config/upload";
import { S3, TimestreamQuery } from "aws-sdk";
import fs from "fs";
import mime from "mime";
import { resolve } from "path";
import IStorageProvider from "../IStorageProvider";

class S3StorageProvider implements IStorageProvider {
    private client: S3;

    constructor() {
        this.client = new S3({
            region: process.env.AWS_BUCKET_REGION
        });
    }

    async save(file: string, folder: string): Promise<string> {
        const originalName = resolve(upload.tmpFolder, file);
        console.log('originalName', originalName);
        const ContentType = mime.getType(originalName);
        console.log('ContentType', ContentType);

        const fileContent = await fs.promises.readFile(originalName);

        await this.client.putObject({
            Bucket: `${process.env.AWS_BUCKET}/${folder}`,
            Key: file,
            ACL: "public-read",
            Body: fileContent,
            ContentType
        }).promise();

        await fs.promises.unlink(originalName);

        return file;
    }
    async delete(file: string, folder: string): Promise<void> {
        this.client.deleteObject({
            Bucket: `${process.env.AWS_BUCKET}/${folder}`,
            Key: file,
        }).promise();
    }

}

export default S3StorageProvider;