const winston = require('winston')

const info = msg => winston.info(msg)
const debug = msg => winston.debug(msg)
const trace = msg => winston.silly(msg)


module.exports = {
    info, debug, trace
}

