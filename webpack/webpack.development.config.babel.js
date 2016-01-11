/* eslint no-var: 0, no-console: 0 */

import path from 'path'
import webpack from 'webpack'
import WebpackErrorNotificationPlugin from 'webpack-error-notification'
import HtmlWebpackPlugin from 'html-webpack-plugin'


const host = process.env.HOST || 'localhost';
const port = (process.env.PORT + 1) || 9999;

const config = {
    devtool: 'source-map',
    entry: [
        'webpack-dev-server/client?http://' + host + ':' + port,
        'webpack/hot/only-dev-server',
        './src/app.js'
    ],
    output: {
        filename: 'bundle.js',
        chunkFilename: '[name].bundle.js',
        path:  path.join(__dirname, '/build/'),
        //publicPath: 'http://' + host + ':' + port + '/build/'
    },
    module: {
        loaders: [
            { test: /\.js$/, exclude: /node_modules/, loaders: ['react-hot', 'babel?cacheDirectory'] },
            { test: /\.scss$/, loaders: ['style', 'css', 'autoprefixer?browsers=last 2 version!sass?outputStyle=expanded&sourceMap=true&sourceMapContents=true'] },
            { test: /\.(jpe?g|png|gif|svg)$/, loader: 'file' }
        ]
    },
    plugins: [

        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('development'),
                BROWSER: JSON.stringify(true)
            }
        }),
        new webpack.NoErrorsPlugin(),
        new WebpackErrorNotificationPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'src/index.html',
            inject: 'body'
        })

    ]

};

export default config