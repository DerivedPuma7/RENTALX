import { Router } from "express";
import CreateSpecificationController from "@modules/cars/useCases/createSpecification/CreateSpecificationController";
import { ensureAuthenticated } from "@shared/infra/http/middleweres/ensureAuthenticate";
import { ensureAdmin } from "@shared/infra/http/middleweres/ensureAdmin";

const specificationsRoutes = Router();

const createSpecificationController = new CreateSpecificationController()

specificationsRoutes.post('/', ensureAuthenticated, ensureAdmin, createSpecificationController.handle);

export default specificationsRoutes;