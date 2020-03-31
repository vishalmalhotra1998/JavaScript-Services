import * as express from 'express';
import * as bodyParser from 'body-parser';
import { Request } from 'express';
import { Response } from 'express';
import errorHandler from '../M1/libs/routes/errorHandler';
import notFoundRoute from '../M1/libs/routes/notFoundRoute';
import mainRoute from './sortRoutes';
import DataBase from '../M1/libs/Database';

// Created a class Server
class ServerM2 {
  private M2: express.Express;
  constructor(private config) {
    this.M2 = express();
  }

  // Bootstrap function is used for calling setupRoutes and initBodyParser
  bootstrap = (): ServerM2 => {
    this.initBodyParser();
    this.setupRoutes();
    return this;
  };

  initBodyParser = (): void => {
    const { M2 } = this;
    M2.use(bodyParser.urlencoded({ extended: true }));
    M2.use(bodyParser.json());
  };
  run = (): void => {
    const {
        M2,
      config: { PORT1: port, MONGO_URL: mongoDbUrl }
    } = this;
    DataBase.open(mongoDbUrl).then(() => {
        M2.listen(port, error => {
        if (error) {
          throw error;
        }
        console.log('App is running succesfully at port number: ' + port);
      });
    });
  };

  setupRoutes = (): ServerM2 => {
    const { M2 } = this;
    // Creating route for health-check
    M2.get('/health-check', (req: Request, res: Response) => {
      res.send('I am OK');
    });
    M2.use('/api', mainRoute);
    M2.use(notFoundRoute);
    M2.use(errorHandler);
    return this;
  };
}

export default ServerM2;