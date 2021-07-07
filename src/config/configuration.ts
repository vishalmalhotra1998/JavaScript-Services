
import { config } from 'dotenv';
import IConfig from './IConfig';
config();
const configuration: IConfig = {
    PORT: process.env.PORT,
    PORT1: process.env.PORT1,
    PORT2: process.env.PORT2,
    NODE_ENV: process.env.NODE_ENV,
    SECRET_KEY: process.env.SECRET_KEY,
    MONGO_URL: process.env.MONGO_URL,
    PASSWORD: process.env.PASSWORD
};
Object.freeze(configuration);
export default configuration;
