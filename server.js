require('es6-promise').polyfill()
require('isomorphic-fetch')

const circleCi = require("./circleCi")

const express = require('express');
const bodyParser = require('body-parser');

const port = 3100

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', function (req, res) {
    res.send('Ciptn Hook reporting  in!');
})

app.post('/ci-hooks/circle-ci', function (req, res) {
    console.log(JSON.stringify(req.body))
    circleCi.downloadArtifacts(req.body.payload)
    res.send(req.body);
})

const server = app.listen(port, function () {
    const host = server.address().address
    const port = server.address().port

    console.log(`Ciptn Hook started at ${host}:${port}`)
})