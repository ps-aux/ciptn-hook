require('es6-promise').polyfill()
require('isomorphic-fetch')

const log = require('src/support/logger')
const git = require('src/command/git')
const deploy = require('src/command/deploy')

const circleCi = require("src/api/circleCi")

const express = require('express');
const bodyParser = require('body-parser');

const port = 3100

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', function (req, res) {
    res.send('Ciptn Hook reporting  in!');
})

app.post('/hooks/circle-ci', function (req, res) {
    log.debug('Build notification from CircleCI')
    log.debug(JSON.stringify(req.body))

    const info = req.body.payload
    const gitUrl = info.vcs_url

    let artifactsDir = null

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

})

const server = app.listen(port, function () {
    const host = server.address().address
    const port = server.address().port

    log.info(`Ciptn Hook started at ${host}:${port}`)
})