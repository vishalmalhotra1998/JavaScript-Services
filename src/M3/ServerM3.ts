import * as express from 'express';
import * as bodyParser from 'body-parser';
import { Request } from 'express';
import { Response } from 'express';
import errorHandler from '../M1/libs/routes/errorHandler';
import notFoundRoute from '../M1/libs/routes/notFoundRoute';
import mainRoute from './router';
import DataBase from '../M1/libs/Database';
import * as cors from 'cors';


// Created a class Server
class ServerM3 {
  private M3: express.Express;
  constructor(private config) {
    this.M3 = express();
  }

  // Bootstrap function is used for calling setupRoutes and initBodyParser
  bootstrap = (): ServerM3 => {
    this.initBodyParser();
    this.setupRoutes();
    return this;
  };

  initBodyParser = (): void => {
    const { M3 } = this;
    M3.use(bodyParser.urlencoded({ extended: true }));
    M3.use(bodyParser.json());
  };
  run = (): void => {
    const {
        M3,
      config: { PORT2: port, MONGO_URL: mongoDbUrl }
    } = this;
    DataBase.open(mongoDbUrl).then(() => {
        M3.listen(port, error => {
        if (error) {
          throw error;
        }
        console.log('App is running succesfully at port number: ' + port);
      });
    });
  };

  setupRoutes = (): ServerM3 => {
    const { M3 } = this;
    // Creating route for health-check
    M3.get('/health-check', (req: Request, res: Response) => {
      res.send('I am OK');
    });
    
    M3.use(cors());
    M3.use('/api', mainRoute);
    M3.use(notFoundRoute);
    M3.use(errorHandler);
    return this;
  };
}

export default ServerM3;