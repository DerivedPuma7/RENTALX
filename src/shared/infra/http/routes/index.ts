import { Router } from 'express';

import categoriesRoutes from './categories.routes';
import specificationRoutes from './specification.routes';
import usersRoutes from './users.routes';
import authenticateRoutes from './authenticate.routes';
import carsRoutes from './cars.routes';
import { rentalRoutes } from './rental.routes';
import passwordRotes from './password.routes';

const router = Router();

router.use('/categories', categoriesRoutes);
router.use('/specification', specificationRoutes);
router.use('/users', usersRoutes);
router.use('/cars', carsRoutes);
router.use('/rentals', rentalRoutes);
router.use('/password', passwordRotes);

router.use(authenticateRoutes)

export default router;