import { v4 as uuidv4 } from "uuid";
import { Expose } from "class-transformer";
import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";

@Entity("users")
class User{
    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    driver_license: string;

    @Column()
    isAdmin: boolean;

    @Column()
    avatar: string

    @CreateDateColumn()
    created_at: Date;

    @Expose({ name: "avatar_url"})
    avatar_url(): string {
        const storageEnvironment = process.env.disk;

        if(storageEnvironment == "local") {
            return `${process.env.APP_API_URL}/avatar/${this.avatar}`
        }
        
        if(storageEnvironment == "s3") {
            return `${process.env.AWS_BUCKET_URL}/avatar/${this.avatar}`
        }

        return null;
    }

    constructor(){
        if(!this.id){
            this.id = uuidv4();
        }
    }
}

export default User;