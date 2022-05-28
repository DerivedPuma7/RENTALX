import ResetPasswordUserController from "@modules/account/useCases/resetPasswordUser/ResetPasswordUserController";
import SendForgotPasswordMailController from "@modules/account/useCases/sendForgotPasswordMail/SendForgotPasswordMailController";
import { Router } from "express";

const passwordRotes = Router();

const sendForgotPasswordMailController = new SendForgotPasswordMailController();
const resetPasswordUserController = new ResetPasswordUserController();

passwordRotes.post("/forgot", sendForgotPasswordMailController.handle);
passwordRotes.post("/reset", resetPasswordUserController.handle);

export default passwordRotes;