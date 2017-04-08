const fs = require('fs')

const writeText = (name, text) =>
    new Promise(res => {
        fs.writeFile(name, text, err => {
            if (err)
                throw new Error('Failed writing to file: ' + err)
            res()
        })
    })

module.exports = {
    writeText
}