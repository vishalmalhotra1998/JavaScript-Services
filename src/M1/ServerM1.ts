import * as express from 'express';
import * as bodyParser from 'body-parser';
import { Request } from 'express';
import { Response } from 'express';
import errorHandler from './libs/routes/errorHandler';
import notFoundRoute from './libs/routes/notFoundRoute';
import mainRoute from './unsortedRoutes';
import DataBase from './libs/Database';
import axios from 'axios';

// Created a class Server
class ServerM1 {
  private app: express.Express;
  constructor(private config) {
    this.app = express();
  }

  // Bootstrap function is used for calling setupRoutes and initBodyParser
  bootstrap = (): ServerM1  => {
    this.initBodyParser();
    this.setupRoutes();

    return this;
  };

  initBodyParser = (): void => {
    const { app } = this;
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
  };
  run = (): void => {
    const {
      app,
      config: { PORT: port, MONGO_URL: mongoDbUrl }
    } = this;
    DataBase.open(mongoDbUrl).then(() => {
      app.listen(port, error => {
        if (error) {
          throw error;
        }
        console.log('App is running succesfully at port number: ' + port);
      });
    });
  };

  setupRoutes = (): ServerM1  => {
    const { app } = this;
    // Creating route for health-check
    app.get('/health-check', (req: Request, res: Response) => {
      res.send('I am OK');
    });
    app.use('/api', mainRoute);
    app.use(notFoundRoute);
    app.use(errorHandler);
    return this;
  }
}

export default ServerM1 ;
