import { Router } from 'express';
import sortStatController from './controller';
const routeHandler = Router();
routeHandler.post('/' , sortStatController.post);
routeHandler.get('/', sortStatController.get);
export default routeHandler;