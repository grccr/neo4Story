
var express = require('express');
var app = express();
app.use(express.static('public'));
var configValidator = require('./configValidator');
var configPreparer = require('./configPreparer');
var webpack = require('webpack');
var argv = require('minimist')(process.argv.slice(2));
var wpconfig = require('./webpack.config');
var config = require(argv['c'] || './public/config.js');
const port = argv['p'] || 8081;

var webpackDevMiddleware =  require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');

console.log("SDF");
console.log(wpconfig);

const compiler = webpack(wpconfig);
app.use(webpackDevMiddleware(compiler, {
    noInfo: true, publicPath: wpconfig.output.publicPath
}));
app.use(webpackHotMiddleware(compiler));


app.get('/config', function (req, res) {
    config.nodeTypes = configPreparer.prepareNodeTypes(config.nodeTypes);
    config.edgeTypes = configPreparer.prepareEdgeTypes(config.edgeTypes);
    res.json(config);
});

let validationNodesResult = configValidator.validateNodeTypes(config.nodeTypes);
let validationEdgesResult = configValidator.validateEdgeTypes(config.edgeTypes, config.nodeTypes);
if (!validationNodesResult.success) console.error('config node types validation failed with: ' + validationNodesResult.message);
else if (!validationEdgesResult.success) console.error('config edge types validation failed with: ' + validationEdgesResult.message);
else
    app.listen(port, function () {
        console.log("Config is fine, server is ready on " + port);
    });