import { Router } from 'express';
import { ensureAuthenticated } from "../middlewares/ensureAuthenticate";
import CreateUserController from '../modules/account/useCases/createUser/CreateUserController';

const usersRoutes = Router();

const createUserController = new CreateUserController();

usersRoutes.use(ensureAuthenticated);
usersRoutes.post('/', createUserController.handle);

export default usersRoutes;