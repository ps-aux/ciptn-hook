const exec = require('child_process').exec


module.exports.runDeploy = (artifactsDir, repoDir) => {
    console.log(`Running deploy.sh artifacts: ${artifactsDir}, repo: ${repoDir}`)
    return new Promise(res => {
        exec(`${repoDir}/deploy.sh '${artifactsDir}'`, (err, stderr, stdout) => {
            if (err) {
                console.error(stderr)
                throw new Error(err)
            }
            console.log('Deploy done', stdout)
            res()
        })
    })
}