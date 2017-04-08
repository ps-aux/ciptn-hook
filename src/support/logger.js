const winston = require('winston')


const log = (level, msg) => winston[level](msg)

const info = msg => log('info', msg)
const debug = msg => log('debug', msg)
const trace = msg => log('silly', msg)
const error = msg => log('error', msg)


module.exports = {
    info, debug, trace, error
}

