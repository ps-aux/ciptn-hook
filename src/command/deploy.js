const run = require('src/system/proc').run

module.exports.runDeploy = (artifactsDir, repoDir) => {
    console.log(`Running deploy.sh artifacts: ${artifactsDir}, repo: ${repoDir}`)

    return new Promise(res => {

        run(`${repoDir}/deploy.sh`, [artifactsDir], () => {
            console.log('Deploy is done')
            res()
        })
    })
}