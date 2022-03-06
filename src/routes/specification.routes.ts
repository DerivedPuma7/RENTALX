import { Router } from "express";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticate";
import CreateSpecificationController from "../modules/cars/useCases/createSpecification/CreateSpecificationController";

const specificationsRoutes = Router();

const createSpecificationController = new CreateSpecificationController()

specificationsRoutes.use(ensureAuthenticated);
specificationsRoutes.post('/', createSpecificationController.handle);

export default specificationsRoutes;