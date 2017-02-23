const exec = require('child_process').exec

module.exports.cloneRepo = (url, dir) => {

    const name = url.split('/').pop()

    return new Promise(res => {
        console.log(`Checking out ${url} to ${dir}`)

        const proc = exec(`git clone ${url}`, {cwd: dir},
            (err, stdout, stderr) => {
                if (err)
                    throw new Error(err)
                console.log('Checkout done', stdout)
                res(`${dir}/${name}`)
            })
    })
}