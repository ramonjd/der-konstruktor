/* eslint no-console: 0 */
//import config from '../config/'
import express from 'express'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import compression from 'compression'
import api from './api/'

// Initialize express server
export default function(callback) {
    const server = express()
    server.set('env', process.env.NODE_ENV || 'development')
    server.set('host', process.env.HOST || 'localhost')
    server.set('port', process.env.PORT || 9999)
    server.set('views', './src/views')
    server.set('view engine', 'jade')
    server.use(morgan(server.get('env') === 'production' ? 'combined' : 'development'))
    server.use(bodyParser.urlencoded({ extended: false }))
    server.use(bodyParser.json())
    server.use(compression())

    api(server)
    server.get('/*', (req, res) => {
        res.status(200)
            .render('index',  {})
    })

    // Generic server errors (e.g. not caught by components)
    server.use((err, req, res, next) => {  // eslint-disable-line no-unused-vars
        console.log('Error on request %s %s', req.method, req.url)
        console.log(err)
        console.log(err.stack)
        res.status(500).send('This is not good')
    })
    // Finally, start the express server
    return server.listen(server.get('port'), () => callback(server))

}
