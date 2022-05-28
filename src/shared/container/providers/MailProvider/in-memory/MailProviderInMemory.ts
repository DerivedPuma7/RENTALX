import IMailProvider from "../IMailProvider";


class MailProviderInMemory implements IMailProvider {
    private message: any[] = [];

    async sendMail(to: string, subject: string, variables: object, path: string): Promise<void> {
        this.message.push({
            to,
            subject,
            variables,
            path
        });
    }

}

export default MailProviderInMemory;