import { Router } from "express";
import AuthenticateUserController from "../modules/account/useCases/authenticateUser/AuthenticateUserController";

const authenticateRoutes = Router();
const authenticateUserController = new AuthenticateUserController();

authenticateRoutes.post('/sessions', authenticateUserController.handle);

export default authenticateRoutes;