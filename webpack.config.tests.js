var webpack = require('webpack');

module.exports = {
    entry: ['./tests/configValidatorTests', './tests/configPreparerTests', './tests/graphTests'],
    output: {
        path: __dirname,
        filename: './tests/bundles/test-bundles.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel',
                exclude: /node_modules/
            }
        ]
    },
    babel: {
        presets: ['es2015'],
        plugins: ['transform-runtime','transform-es2015-destructuring', 'transform-object-rest-spread']
    }
};