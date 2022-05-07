import { Router } from "express";
import CreateCarController from "@modules/cars/useCases/createCar/CreateCarController";
import { ensureAuthenticated } from "../middleweres/ensureAuthenticate";
import { ensureAdmin } from "../middleweres/ensureAdmin";
import ListAvailableCarsController from "@modules/cars/useCases/listAvailableCars/ListAvailableCarsController";

const carsRoutes = Router();
const createCarController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();

carsRoutes.post('/', ensureAuthenticated, ensureAdmin, createCarController.handle);
carsRoutes.get('/available', listAvailableCarsController.handle);


export default carsRoutes;

