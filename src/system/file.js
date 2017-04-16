const fs = require('fs')
const shell = require('shelljs');
const readLine = require('readline')

const writeText = (name, text) =>
    new Promise(res => {
        fs.writeFile(name, text, err => {
            if (err)
                throw new Error('Failed writing to file: ' + err)
            res()
        })
    })

const readText = ({path, onLine, onEnd}) => {
    // TODO error handling ????
    const reader = readLine.createInterface({
        input: fs.createReadStream(path)
    })

    reader.on('line', onLine)
    reader.on('close', onEnd)
}

const ensureDir = path => {
    shell.mkdir('-p', path)
}

module.exports = {
    writeText, ensureDir, readText
}