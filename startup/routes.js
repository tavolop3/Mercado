const express = require('express');
const users = require('../routes/users.routes');
const error = require('../middlewares/error');

module.exports = function(app){
    app.use(express.json());
    app.use('/api/users', users);
    app.use(error);
}