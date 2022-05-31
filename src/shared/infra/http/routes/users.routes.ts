import { Router } from 'express';
import { ensureAuthenticated } from "@shared/infra/http/middleweres/ensureAuthenticate";
import multer from 'multer';
import uploadConfig from '@config/upload';

import CreateUserController from '@modules/account/useCases/createUser/CreateUserController';
import UpdateUserAvatarController from '@modules/account/useCases/updateUserAvatar/updateUserAvatarController';
import ProfileUserController from '@modules/account/useCases/ProfileUser/ProfileUserController';

const usersRoutes = Router();
const uploadAvatar = multer(uploadConfig);

const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();
const profileUserController = new ProfileUserController()

usersRoutes.post('/', createUserController.handle);
usersRoutes.get('/profile', ensureAuthenticated, profileUserController.handle);
usersRoutes.patch('/avatar', ensureAuthenticated, uploadAvatar.single("avatar"), updateUserAvatarController.handle);

export default usersRoutes;