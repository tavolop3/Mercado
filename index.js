const app = require('express')();
const sequelize = require('./db');

require('./startup/routes')(app);
require('./startup/db')();

const port = process.env.PORT || 8080;
app.listen(port);