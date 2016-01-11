
require('babel-register');

if (process.env.ENV === 'development') {
    require('./webpack/webpack.development.server').default();
}
