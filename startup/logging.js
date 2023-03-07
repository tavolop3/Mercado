require('express-async-errors');
const winston = require('winston');

module.exports = function() {
    const logger = winston.createLogger({
        level: 'error',
        format: winston.format.combine(
          winston.format.timestamp(),
          winston.format.prettyPrint()
        ),
        transports: [
          new winston.transports.Console({
            format: winston.format.combine(
              winston.format.colorize(),
              winston.format.simple()
            )
          }),
          new winston.transports.File({ filename: 'logs/logfile.log' })
        ],
        exceptionHandlers: [
            new winston.transports.Console(),
            new winston.transports.File({ filename: 'logs/uncaughtExceptions.log' })
        ]
      });
    
    winston.add(logger);
}