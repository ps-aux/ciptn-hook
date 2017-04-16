const log = require('src/support/logger')
const http = require('src/support/httpClient')


const apiRoot = 'https://api.github.com'


const contentsRoot = (owner, repo) => `${apiRoot}/repos/${owner}/${repo}/contents`

const isDocker = ({owner, repo}) =>
    http.get(contentsRoot(owner, repo))
        .then(r => r.filter(f => f.name === 'docker').length > 0)

const getDockerCompose = ({owner, repo}) =>
    http.get(contentsRoot(owner, repo) + '/docker/docker-compose.yml')
        .then(res => http.get(res.download_url, {contentType: 'text'}))


module.exports = {
    isDocker, getDockerCompose
}
