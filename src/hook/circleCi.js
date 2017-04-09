const log = require('src/support/logger')
const file = require('src/system/file')


module.exports = body => {
    const data = body.payload
    const gitUrl = info.vcs_url


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

    log.info('Processing circle ci hook')
    log.info(JSON.stringify(data))
}