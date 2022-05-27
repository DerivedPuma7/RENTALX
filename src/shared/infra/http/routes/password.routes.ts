import SendForgotPasswordMailController from "@modules/account/useCases/sendForgotPasswordMail/SendForgotPasswordMailController";
import { Router } from "express";

const passwordRotes = Router();

const sendForgotPasswordMailController = new SendForgotPasswordMailController();

passwordRotes.post("/forgot", sendForgotPasswordMailController.handle);

export default passwordRotes;