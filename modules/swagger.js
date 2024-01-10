const swaggerUi = require('swagger-ui-express');
const swaggereJsdoc = require('swagger-jsdoc');

const options = {
    swaggerDefinition: {
        info: {
            title: 'Test API',
            version: '1.0.0',
            description: 'Test API with express',
        },
        host: 'http://122.34.57.9:9898/',
        basePath: '/'
    },
    apis: ['./routes/*.js', './swagger/']
};

const specs = swaggereJsdoc(options);

module.exports = {
    swaggerUi,
    specs
};