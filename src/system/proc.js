const spawn = require('child_process').spawn

module.exports.run = ({command, args, onDone, cwd, env}) => {

    const proc = spawn(command, args, {cwd: cwd})

    proc.stdout.on('data', data => {
        console.log(`  ${data}`)
    })
    proc.stderr.on('data', data => {
        console.error(`  ${data}`)
    })

    proc.on('close', code => {
        if (code)
            throw new Error(`Running ${command} ended up with non-zero return code`)
        onDone()
    })
}