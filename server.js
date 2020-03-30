const faker = require("faker");
const times = require("lodash.times");
const random = require("lodash.random");
const db = require("./models");
const bodyParser = require("body-parser")
const express = require("express")
const app = express();
const swaggerJsdoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express');

const apiStage = require("./app/api/stage");
const apiUser = require("./app/api/user");

const PORT = process.env.PORT || 8080

const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'Tenaxi API',
            version: '1.0.0',
            description: 'College project API',
        },
        servers: [`http://localhost:${PORT}`],
    },
    apis: ["./app/api/stage.js", "./app/api/user"]
}

app.use(bodyParser.json());
app.use(express.static("app/public"));

const swaggerDocs = swaggerJsdoc(swaggerOptions)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

apiStage(app, db);
apiUser(app, db);

db.sequelize.sync().then(() => {
    app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));
});