import CreateRentalController from "@modules/rentals/useCases/CreateRental/CreateRentalController";
import { Router } from "express";
import { ensureAuthenticated } from "../middleweres/ensureAuthenticate";

const rentalRoutes = Router();
const createRentalController = new CreateRentalController();

rentalRoutes.post("/", ensureAuthenticated, createRentalController.handle)

export { rentalRoutes };