import * as swaggerJsdoc from 'swagger-jsdoc';
const options = {
  apis: ['dist/controller/**/routes.js', './dist/controllers/trainee/Swagger.js', './dist/controllers/trainee/routes.js', './dist/controllers/user/routes.js'],
  swaggerDefinition: {
    basePath: '/api',
    info: {
      description: 'Test Trainee API ',
      swagger: '2.0',
      openapi: '3.0.0',
      title: 'My Trainee API',
      version: '1.0.0',
    },
    securityDefinitions: {
      Bearer: {
        in: 'Headers',
        name: 'Authorization',
        type: 'apiKey',
      }
    },
    servers: ['http://localhost:9000'],
  }
};
const swaggerOptions = swaggerJsdoc(options);
export default swaggerOptions;
