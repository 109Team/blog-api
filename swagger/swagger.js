const swaggerUi = require('swagger-ui-express');

const swaggerDocument = require('./swagger.json');

module.exports = () => {
    return [swaggerUi.serve, swaggerUi.setup(swaggerDocument)];
}