const run = require('src/system/proc').run
const log = require('src/support/logger')

module.exports.runDockerCompose = (dir, env) => {
    return new Promise(res => {
        log.info(`Running docker compose in  ${dir}.Env is ${JSON.stringify(env)}`)

        run({
            command: `docker-compose`,
            args: ['up', '-d'],
            cwd: dir,
            env,
            onDone: () => {
                log.debug('docker-compose done')
                res()
            }
        })
    })
}
