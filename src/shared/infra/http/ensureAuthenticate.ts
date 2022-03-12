import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import AppError from "@shared/errors/AppError";
import UsersRepository from "@modules/account/infra/typeorm/repositories/UsersRepository";

interface IPayload{
    sub: string;
}


export async function ensureAuthenticated(request: Request, response: Response, next: NextFunction){
    
    const authHeader = request.headers.authorization;

    if(!authHeader){
        throw new AppError("Token missing", 401)
    }
    
    //[0] = bearer
    //[1] = token
    const [, token] = authHeader.split(" ");

    try {
        const { sub: user_id } = verify(token, "3a3c094a19bc869da75e6815f0c07cc5") as IPayload;

        const usersRepository = new UsersRepository();
        const user = await usersRepository.findById(user_id);

        if(!user){
            throw new AppError("User does not exists", 401);
        }

        request.user = {
            id: user.id
        }

        next();
    } catch (error) {
        throw new AppError("Invalid token", 401);
    }
}