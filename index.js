const app = require('express')();
const { Sequelize } = require('sequelize');
const { sequelize } = require('./db');
const bcrypt = require('bcrypt');

require('./startup/routes')(app);
require('./db').init();

const port = process.env.PORT || 8080;
app.listen(port);

const UserModel = require('./models/user');
const User = UserModel(sequelize, Sequelize);