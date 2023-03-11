const app = require('express')();

require('./startup/routes')(app);
require('./startup/logging')();
require('./startup/db')();

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Serve at http://localhost:${port}`)
});