var config = require('./public/config.js');
var express = require('express');
var app = express();
app.use(express.static('public'));
var configValidator = require('./configValidator');

const port = 8081;

app.get('/config', function (req, res) {
    res.json(config);
});

let validationNodesResult = configValidator.validateNodeTypes(config.nodeTypes);
let validationEdgesResult = configValidator.validateEdgeTypes(config.edgeTypes);
if (!validationNodesResult.success) console.error(validationNodesResult.message);
else if (!validationEdgesResult.success) console.error(validationEdgesResult.message);
else
    app.listen(port, function () {
        console.log("Config is fine, server is ready on " + port);
    });