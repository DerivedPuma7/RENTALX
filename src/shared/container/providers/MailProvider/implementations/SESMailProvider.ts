import nodemailer, { Transporter } from "nodemailer";
import aws from "aws-sdk";
import IMailProvider from "../IMailProvider";
import handlebars from "handlebars";
import fs from "fs";
import { injectable } from "tsyringe";

@injectable()
class SESMailProvider implements IMailProvider {
    private client: Transporter;

    constructor() {
        this.client = nodemailer.createTransport({
            SES: new aws.SES({
                apiVersion: "2021-12-01",
                region: process.env.AWS_REGION
            })
        });
    }

    async sendMail(to: string, subject: string, variables: object, path: string): Promise<void> {
        const templateFileContent = fs.readFileSync(path).toString("utf-8");

        const templateParse = handlebars.compile(templateFileContent);
        const templateHTML = templateParse(variables);

        await this.client.sendMail({
            to,
            from: "Rentalx <gustavo@derivedpuma7.com.br", // aqui deve vir um email válido, mas nossa aplicação não está hospedada
            subject,
            html: templateHTML
        });
    }
}

export default SESMailProvider;