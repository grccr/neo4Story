
var express = require('express');
var app = express();
app.use(express.static('public'));
var configValidator = require('./configValidator');
var configPreparer = require('./configPreparer');
var argv = require('minimist')(process.argv.slice(2));
var config = require(argv['c'] || './public/config.js');
const port = argv['p'] || 8081;

app.get('/config', function (req, res) {
    config.nodeTypes = configPreparer.prepareNodeTypes(config.nodeTypes);
    config.edgeTypes = configPreparer.prepareEdgeTypes(config.edgeTypes);
    res.json(config);
});

let validationNodesResult = configValidator.validateNodeTypes(config.nodeTypes);
let validationEdgesResult = configValidator.validateEdgeTypes(config.edgeTypes);
if (!validationNodesResult.success) console.error('config node types validation failed with: ' + validationNodesResult.message);
else if (!validationEdgesResult.success) console.error('config edge types validation failed with: ' + validationEdgesResult.message);
else
    app.listen(port, function () {
        console.log("Config is fine, server is ready on " + port);
    });