interface IMailProvider {
    sendMail(to: string, subject: string, variables: object, path: string): Promise<void>;
}

export default IMailProvider;