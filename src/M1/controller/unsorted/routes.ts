import { Router } from 'express';
import unsortedController from './controller';

const routeHandler = Router();
routeHandler.post('/' , unsortedController.post);
routeHandler.get('/' , unsortedController.get);
routeHandler.put('/', unsortedController.put);


export default routeHandler;