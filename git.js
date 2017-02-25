const run = require('./proc').run

module.exports.cloneRepo = (url, dir) => {

    const name = url.split('/').pop()

    return new Promise(res => {
        console.log(`Checking out ${url} to ${dir}`)
        run(`git`, ['clone', url], () => {
            console.log('Checkout done')
            res(`${dir}/${name}`)
        }, dir)
    })
}