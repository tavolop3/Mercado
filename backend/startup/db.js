const winston = require('winston');
const sequelize = require('../db');

module.exports = async function(){
    try {
        await sequelize.authenticate();
        winston.info('Connection has been established successfully.');
    } catch (error) {
        winston.error(error, 'Connection to the database failed. Check logs.');
    }
    
    // This will run .sync() only if database name ends with '_test'
    await sequelize.sync({ force: true, match: /_test$/ })
        .catch((err) => {
            winston.error('Sync failed.', err);
    });
    
    // const User = require('./models/user');

    // (async () => {
    //     await sequelize.sync({ force: true });
    //     const tavo = await User.create({
    //         mail: 'tavo4@gmail.com',
    //         password: 'hashedpass',
    //         username: 'tavo4',
    //         phone: '12345',
    //         adressId: 1      
    //     });
    //     console.log(tavo.toJSON());
    // })();
};