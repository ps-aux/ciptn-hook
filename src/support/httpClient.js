const log = require('src/support/logger')

const doRequest = (method, url, {contentType = 'json'}) => {
    const req = {
        method
    }

    log.info(`Requesting ${method}, ${url}`)

    return fetch(url, req)
        .then(res => {
            if (res.status !== 200)
                throw new Error('Non 200 response')
            return res
        }).then(r => {
            if (contentType === 'json')
                return r.json()
            else if (contentType === 'text')
                return r.text()
            throw new Error('Unknown content type')
        })

}

const get = (url, opts) => {
    if (!opts)
        opts = {}
    return doRequest('GET', url, opts)
}

module.exports = {
    get
}

