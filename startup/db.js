const sequelize = require('../db');

module.exports = async function(){
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }

    await sequelize.sync({ force: true });
    
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