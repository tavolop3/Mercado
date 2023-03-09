const app = require('express')();

require('./startup/routes')(app);
require('./startup/logging')();
require('./startup/db')();

const port = process.env.PORT || 8080;
app.listen(port);