const fs = require('fs')
const mkdirp = require('mkdirp')

const apiRoot = 'https://circleci.com/api/v1.1'
const downloadDir = '/tmp/Downloads/ci/circle-ci'


const getArtifactsUrl = hookInfo => {
    const vcsType = hookInfo.vcs_type
    const username = hookInfo.username
    const project = hookInfo.reponame
    const buildNum = hookInfo.build_num

    return `${apiRoot}/project/${vcsType}/${username}/${project}/${buildNum}/artifacts`
}

const downloadArtifact = (artifact, dir) => {
    const name = artifact.path.split('/').pop()
    console.log(`Downloading ${name} to ${dir}`)

    const dest = fs.createWriteStream(`${dir}/${name}`)

    return new Promise(res => {
        dest.on('finish', () => {
            console.log(`Finished downloading ${name}`)
            res()
        })

        fetch(artifact.url)
            .then(r => r.body.pipe(dest))
    })
}

const createDownloadDir = dir => {
    return new Promise(res => {
        mkdirp(dir,
            err => {
                if (err)
                    throw new Error(err)
                res()
            })
    })
}

module.exports = {

    downloadArtifacts: hookInfo => {

        const url = getArtifactsUrl(hookInfo)
        const name = hookInfo.reponame
        const dir = `${downloadDir}/${name}/build-${hookInfo.build_num}`

        return createDownloadDir(dir)
            .then(() => fetch(url))
            .then(r => r.json())
            .then(artifacts => {
                console.log(artifacts)
                const jobs = artifacts.map(a => downloadArtifact(a, dir))
                return Promise.all(jobs)
            })
            .then(() => dir)
    }
}