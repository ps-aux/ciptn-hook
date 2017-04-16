const log = require('src/support/logger')
const file = require('src/system/file')

const storageLocation = '/tmp'
const confLocation = '/etc/deploy/env'

const getDir = appName => storageLocation + '/' + appName

const storeFile = (appName, fileName, content) => {
    const dirPath = getDir(appName)
    const filePath = dirPath + '/' + fileName
    file.ensureDir(dirPath)

    log.debug(`Storing file ${filePath}`)
    return file.writeText(filePath, content)
}

const getEnvFilePath = appName => confLocation + '/' + appName

module.exports = {
    storeFile, getDir, getEnvFilePath
}

