import { Router } from "express";
import CreateCarController from "@modules/cars/useCases/createCar/CreateCarController";
import { ensureAuthenticated } from "../middleweres/ensureAuthenticate";
import { ensureAdmin } from "../middleweres/ensureAdmin";

const carsRoutes = Router();
const createCarController = new CreateCarController();

carsRoutes.post('/', ensureAuthenticated, ensureAdmin, createCarController.handle);


export default carsRoutes;

