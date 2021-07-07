import { Router } from 'express';
import unsort from './controller/unsorted/routes';
import sortStats from './controller/sortStats/routes';
const mainRoute = Router();
mainRoute.use('/unsortCreate', unsort);
mainRoute.use('/sortStats', sortStats);
export default mainRoute;