import { Router } from "express";
import multer from "multer";
import CreateCarController from "@modules/cars/useCases/createCar/CreateCarController";
import { ensureAuthenticated } from "../middleweres/ensureAuthenticate";
import { ensureAdmin } from "../middleweres/ensureAdmin";
import ListAvailableCarsController from "@modules/cars/useCases/listAvailableCars/ListAvailableCarsController";
import CreateCarSpecificationController from "@modules/cars/useCases/CreateCarSpecification/CreateCarSpecificationController";
import UploadCarImageController from "@modules/cars/useCases/uploadCarImage/UploadCarImageController";
import uploadConfig from '@config/upload';

const carsRoutes = Router();
const createCarController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();
const createCarSpecificationController = new CreateCarSpecificationController();
const uploadCarImageController = new UploadCarImageController();

const upload = multer(uploadConfig);

carsRoutes.post('/', ensureAuthenticated, ensureAdmin, createCarController.handle);
carsRoutes.get('/available', listAvailableCarsController.handle);
carsRoutes.post('/specifications/:car_id', ensureAuthenticated, ensureAdmin, createCarSpecificationController.handle);  
carsRoutes.post('/images/:car_id', ensureAuthenticated, ensureAdmin, upload.array("images"), uploadCarImageController.handle);


export default carsRoutes;

