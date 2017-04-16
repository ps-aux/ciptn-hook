const spawn = require('child_process').spawn
const log = require('src/support/logger')

module.exports.run = ({command, args, onDone, cwd, env}) => {

    const proc = spawn(command, args, {cwd, env})

    proc.stdout.on('data', data => {
        log.trace(`  ${data}`)
    })
    proc.stderr.on('data', data => {
        log.error(`  ${data}`)
    })

    proc.on('close', code => {
        if (code)
            throw new Error(`Running ${command} ended up with non-zero return code`)
        onDone()
    })
}