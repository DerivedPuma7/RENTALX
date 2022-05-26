import { Request, Response } from "express";
import { container } from "tsyringe";
import RefreshTokenUseCase from "./refreshTokenUseCase";


class RefreshTokenController {

    async handle(request: Request, response: Response): Promise<Response> {
        const token =
            request.body.token ||
            request.headers["x-access-token"] ||
            request.query.token;

        const refreshTokenUseCase = container.resolve(RefreshTokenUseCase);

        const refreshToken = await refreshTokenUseCase.execute(token);
        console.log('token', token);
        console.log('refreshToken', refreshToken);

        return response.status(200).json({ refreshToken });
    }
}

export default RefreshTokenController;