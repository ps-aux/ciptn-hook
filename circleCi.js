const request = require('request');

const apiRoot = 'https://circleci.com/api/v1.1'

module.exports = {

    downloadArtifacts: hookInfo => {
        const vcsType = hookInfo.vcs_type
        const username = hookInfo.username
        const project = hookInfo.reponame
        const buildNum = hookInfo.build_num

        const url = `${apiRoot}/project/${vcsType}/${username}/${project}/${buildNum}/artifacts`

        request.get(url, (err, res, body) => {
            console.debug('Response from CircleCi')
            console.log(body)
        })


    }

}