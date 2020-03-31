import { Router } from 'express';
import SortedController from './controller';

const sortRouteHandler = Router();

sortRouteHandler.post('/', SortedController.post);
export default sortRouteHandler;