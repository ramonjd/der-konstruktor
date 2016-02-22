/* eslint no-var: 0, no-console: 0 */

import path from 'path'
import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'


const config = {
    entry: './src/app.js',
    output: {
        filename: 'bundle.min.js',
        path:  path.join(__dirname, '../build/')
    },
    module: {
        preLoaders: [
            {
                test: /(\.js$)/,
                exclude: /node_modules/,
                loader: 'eslint-loader'
            }
        ],
        loaders: [
            { test: /\.js$/, exclude: /node_modules/, loaders: ['babel-loader'] },
            { test: /\.scss$/, loaders: ['style', 'css', 'autoprefixer?browsers=last 2 version!sass?outputStyle=compact&sourceMap=false'] },
            { test: /\.(jpe?g|png|gif|svg)$/, loader: 'file' }
        ]
    },
    eslint: {
        configFile: '.eslintrc'
    },
    plugins: [
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production'),
                BROWSER: JSON.stringify(true)
            }
        })
/*        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'src/index.html',
            inject: 'body'
        })*/

    ]
}

export default config