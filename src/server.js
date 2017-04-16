require('es6-promise').polyfill()
require('isomorphic-fetch')

const log = require('src/support/logger')
const git = require('src/command/git')
const deploy = require('src/command/deploy')
const file = require('src/system/file')

const http = require('src/support/httpClient')
const githubApi = require('src/api/github')

const circleCi = require("src/hook/circleCi")

const express = require('express');
const bodyParser = require('body-parser');

const fs = require('fs')

const port = 3100

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', function (req, res) {
    res.send('Ciptn Hook reporting in!');
})

app.post('/hooks/circle-ci', req => circleCi(req.body))


const server = app.listen(port, function () {
    const host = server.address().address
    const port = server.address().port

    log.info(`Ciptn Hook started at ${host}:${port}`)


    githubApi.isDocker({owner: 'ps-aux', repo: 'lunchgator-server'})
        .then(r => console.log('result is', r))

    // .then(() => console.log('success'))

    // // githubApi.isDocker('ps-aux', 'lunchgator-server')
    // //     .then(console.log)
    // githubApi.getDockerCompose('ps-aux', 'lunchgator-server')
    //     .then(text => file.writeText('/tmp/hovno', text))

})