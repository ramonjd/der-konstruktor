/*
require('babel-register');

if (process.env.ENV === 'development') {
    require('./webpack/webpack.development.server').default();
}*/



require('babel-register');
var server = require('./src/server');
server.default(function (app) {
    console.log(app.get('env'));
    console.log('Express %s server listening on %s:%s', app.get('env'), app.get('host'), app.get('port'));
    if (app.get('env') === 'development') {
        require('./webpack/webpack.development.server').default();
    }
});

