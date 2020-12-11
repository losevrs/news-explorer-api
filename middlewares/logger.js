const path = require('path');
const winston = require('winston');
const expressWinston = require('express-winston');

module.exports.srvLog = expressWinston.logger({
  transports: [
    new winston.transports.File({
      filename: path.join(__dirname, '..', 'logs', 'request.log').normalize(),
    }),
  ],
  format: winston.format.json(),
});

module.exports.errorLog = expressWinston.errorLogger({
  transports: [
    new winston.transports.File({
      filename: path.join(__dirname, '..', 'logs', 'error.log').normalize(),
    }),
  ],
  format: winston.format.json(),
});
