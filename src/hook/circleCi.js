const log = require('src/support/logger')
const storageManager = require('src/support/storageManager')
const github = require('src/api/github')


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
        .then(r => console.log('File saved'))

    /*    circleCi.downloadArtifacts(info)
     .then(dir => {
     artifactsDir = dir
     return git.cloneRepo(gitUrl, artifactsDir)
     })
     .then(repoDir => deploy.runDeploy(artifactsDir, repoDir))
     .then(() => {
     console.log('Done.Sending response')
     res.send(req.body);
     }).catch(e => {
     throw e
     })*/
}