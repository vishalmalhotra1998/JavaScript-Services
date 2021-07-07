import { Router } from 'express';
import sort from './controller/sort/routes';
const mainRoute = Router();
mainRoute.use('/sorting', sort);
export default mainRoute;