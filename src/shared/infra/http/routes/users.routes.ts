import { Router } from 'express';
import { ensureAuthenticated } from "@shared/infra/http/middleweres/ensureAuthenticate";
import multer from 'multer';
import uploadConfig from '@config/upload';

import CreateUserController from '@modules/account/useCases/createUser/CreateUserController';
import UpdateUserAvatarController from '@modules/account/useCases/updateUserAvatar/updateUserAvatarController';

const usersRoutes = Router();
const uploadAvatar = multer(uploadConfig.upload("./tmp/avatar"));

const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();

usersRoutes.post('/', createUserController.handle);
usersRoutes.patch('/avatar', ensureAuthenticated, uploadAvatar.single("avatar"), updateUserAvatarController.handle);

export default usersRoutes;