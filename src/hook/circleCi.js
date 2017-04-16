const log = require('src/support/logger')
const storageManager = require('src/support/storageManager')
const github = require('src/api/github')
const docker = require('src/command/docker')
const configParser = require('src/support/configParser')


module.exports = data => {
    const appName = data.reponame
    const user = data.username
    const url = data.vcs_url

    const repo = {owner: user, repo: appName}


    log.info(`Processing ci hook for ${appName}`)

    github.isDocker(repo)
        .then(res => {
            if (!res)
                throw new Error(`Repo ${url} is not a Docker app`)
            log.debug('It is a Docker app')
            return github.getDockerCompose(repo)
        })
        .then(content =>
            storageManager.storeFile(appName, 'docker-compose.yml', content))
        .then(() =>
            configParser.parseValKeyFile(storageManager.getEnvFilePath(appName)))
        .then(env =>
            docker.runDockerCompose(storageManager.getDir(appName), env))
        .then(r =>
            log.info('Circle CI done'))
}