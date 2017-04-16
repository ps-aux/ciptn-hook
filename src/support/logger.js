const winston = require('winston')

const logger = new (winston.Logger)({
    transports: [
        new (winston.transports.Console)({level: 'silly'}),
    ]
});


const log = (level, msg) => logger[level](msg)

const info = msg => log('info', msg)
const debug = msg => log('debug', msg)
const trace = msg => log('silly', msg)
const error = msg => log('error', msg)


module.exports = {
    info, debug, trace, error
}

