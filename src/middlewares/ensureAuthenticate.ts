import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import UsersRepository from "../modules/account/repositories/implementations/UsersRepository";

interface IPayload{
    sub: string;
}


export async function ensureAuthenticated(request: Request, response: Response, next: NextFunction){
    
    const authHeader = request.headers.authorization;
    
    if(!authHeader){
        throw new Error("token missing");
    }
    
    //[0] = bearer
    //[1] = token
    const [, token] = authHeader.split(" ");

    try {
        const { sub: user_id } = verify(token, "3a3c094a19bc869da75e6815f0c07cc5") as IPayload;

        const usersRepository = new UsersRepository();
        const UserExists = await usersRepository.findById(user_id);

        if(!UserExists){
            throw new Error("User does not exists");
        }

        next();
    } catch (error) {
        throw new Error("Invalid token");
    }
}