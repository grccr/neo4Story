var path = require('path');
var webpack = require('webpack');
const merge = require('webpack-merge');
const TARGET = process.env.npm_lifecycle_event;

var folder = 'public';

const common = {
    entry: ['webpack-dev-server/client?http://0.0.0.0:9000/', 'webpack/hot/only-dev-server',
        `./${folder}/main.js`
        ],
    output: {
        path: path.resolve(__dirname, `${folder}/dist/`),
        publicPath: '/dist/',
        filename: 'build.js'
    },
    externals: {
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                // NODE_ENV: '"production"'
            }
        })
    ],
    resolveLoader: {
        root: path.join(__dirname, 'node_modules')
    },
    module: {
        loaders: [
            // { 
            //     test: /\.js$/, 
            //     exclude: /(node_modules|bower_components)/,
            //     loader: 'babel-loader',
            //     query: {
            //         presets: ['es2015']
            //     }
            // },
            {
                test: /\.vue$/,
                loader: 'vue'
            },
            { 
                test: /\.js$/, 
                include: [path.resolve(__dirname, "vue")], 
                loader: 'babel' 
            },
            {
                test: /\.json$/,
                loader: 'json'
            },
            {
                test: /\.html$/,
                loader: 'vue-html'
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'url',
                query: {
                    limit: 10000,
                    name: '[name].[ext]?[hash]'
                }
            },
            {
                test: /\.(scss | css)$/,
                loaders: ['style', 'css', 'sass']
            },
            { test: /bootstrap\/js\//, loader: 'imports?jQuery=jquery' },
            { test: /\.(woff|woff2)$/,  loader: "url-loader?limit=10000&mimetype=application/font-woff" },
            { test: /\.ttf$/,    loader: "file-loader" },
            { test: /\.eot$/,    loader: "file-loader" },
            { test: /\.svg$/,    loader: "file-loader" }
        ]
    },
    vue: {
        loaders: {
            js: 'babel'
        }
    },
    babel: {
        presets: ['es2015'],
        plugins: ['transform-runtime','transform-es2015-destructuring', 'transform-object-rest-spread']
    },
    devServer: {
        port: 9000,
        host: 'localhost',
        historyApiFallback: true,
        noInfo: true,
        contentBase: "./public"
    },
    devtool: '#eval',
    cache: true,
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ]
};

if (TARGET === 'dev' || TARGET === 'watch' || !TARGET) {
    console.log(common);
    module.exports = merge(common, {
        devServer: {
            port: 9000,
            proxy: {
                '/': {
                    target: 'http://localhost:8081',
                    secure: false,
                    // prependPath: false
                }
            },
            watchOptions: {
                aggregateTimeout: 300,
                poll: 1000
            },
            publicPath: 'http://localhost:8081/',
            historyApiFallback: true
        },
        devtool: 'source-map'
    });
}

// if (process.env.NODE_ENV === 'production') {
//     module.exports.devtool = '#source-map';
//     module.exports.plugins = (module.exports.plugins || []).concat([
//         new webpack.DefinePlugin({
//             'process.env': {
//                 NODE_ENV: '"production"'
//             }
//         }),
//         new webpack.optimize.UglifyJsPlugin({
//             compress: {
//                 warnings: false
//             }
//         }),
//         new webpack.optimize.OccurenceOrderPlugin()
//     ])
// }
