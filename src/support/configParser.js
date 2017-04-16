const log = require('src/support/logger')
const file = require('src/system/file')


/**
 * Reads & parses file with val=key content
 * to the corresponding JSON object
 */
const parseValKeyFile = path => {
    log.trace(`Parsing  ${path}`)

    const obj = {}

    return new Promise(res => {
        file.readText({
            path,
            onLine: l => {
                // Ignore empty lines
                if (!l.trim())
                    return

                const split = l.split('=')
                console.log(split)
                if (split.length !== 2)
                    throw new Error(`Found invalid line '${l}'`)
                obj[split[0].trim()] = split[1].trim()
            },
            onEnd: () => res(obj)
        })
    })
}

module.exports = {
    parseValKeyFile
}