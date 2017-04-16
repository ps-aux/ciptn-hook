const log = require('src/support/logger')
const file = require('src/system/file')

const storageLocation = '/tmp'

const storeFile = (appName, fileName, content) => {
    const dirPath = storageLocation + '/' + appName
    const filePath = dirPath + '/' + fileName
    file.ensureDir(dirPath)

    log.debug(`Storing file ${filePath}`)
    return file.writeText(filePath, content)
}

module.exports = {
    storeFile
}

