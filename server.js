const circleCi = require("./circleCi")

const express = require('express');
const bodyParser = require('body-parser');

const port = 3000

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', function (req, res) {
    res.send('Ciptn Hook reporting  in!');
})

app.post('/hook-dat-shit', function (req, res) {
    console.log(JSON.stringify(req.body))
    circleCi.downloadArtifacts(req.body.payload)
    res.send(req.body);
})

const server = app.listen(port, function () {
    var host = server.address().address
    var port = server.address().port

    console.log("Example app listening at http://%s:%s", host, port)
})