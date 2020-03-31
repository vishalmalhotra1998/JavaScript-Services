import config from './config/configuration';
import ServerM1 from './M1/ServerM1';
import ServerM2 from './M2/ServerM2';
import ServerM3 from './M3/ServerM3';

const serverM1 = new ServerM1(config);
const serverM2 = new ServerM2(config);
const serverM3 = new ServerM3(config);

serverM1.bootstrap();
serverM1.run();
serverM2.bootstrap();
serverM2.run();
serverM3.bootstrap();
serverM3.run();