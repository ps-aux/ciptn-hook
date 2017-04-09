const fs = require('fs')
const shell = require('shelljs');

const writeText = (name, text) =>
    new Promise(res => {
        fs.writeFile(name, text, err => {
            if (err)
                throw new Error('Failed writing to file: ' + err)
            res()
        })
    })

const ensureDir = path => {
    shell.mkdir('-p', path)
/*    return new Promise(res => {
        fs.mkdir(path, err => {
            if (err)
                if (err.code !== 'EEXIST')
                    throw new Error(err)
            res()
        })
    })*/
}

module.exports = {
    writeText, ensureDir
}