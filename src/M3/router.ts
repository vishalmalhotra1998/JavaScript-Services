import { Router } from 'express';
import mediator from './controller/Mediator/routes';
import sortMediator from './controller/sortMediator/routes';
const mainRoute = Router();
mainRoute.use('/unsort', mediator);
mainRoute.use('/sort', sortMediator);
export default mainRoute;