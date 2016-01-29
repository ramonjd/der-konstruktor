/* eslint no-console: 0 */
//import config from '../config/'
import express from 'express'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import compression from 'compression'
import api from './api/'
import socketIO from 'socket.io'
import http from 'http'
import {registerJobs} from './lib/ScheduleManager'

// Initialize express server
export default function(callback) {
    const app = express()


    app.set('env', process.env.NODE_ENV || 'development')
    app.set('host', process.env.HOST || 'localhost')
    app.set('port', process.env.PORT || 9999)
    app.set('views', './src/views')
    app.set('view engine', 'jade')
    app.use(morgan(app.get('env') === 'production' ? 'combined' : 'development'))
    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(bodyParser.json())
    app.use(compression())

    api(app)


    app.get('/*', (req, res) => {
        res.status(200)
            .render('index',  {})
    })

    // Generic server errors (e.g. not caught by components)
    app.use((err, req, res, next) => {  // eslint-disable-line no-unused-vars
        console.log('Error on request %s %s', req.method, req.url)
        console.log(err)
        console.log(err.stack)
        res.status(500).send('This is not good')
    })




//const httpServer = http.Server(app)




   // app.listen(app.get('port'), () => callback(app))


    const httpServer = http.createServer(app).listen(app.get('port'), ()=>{
        console.log('Express server listening on port ' + app.get('port'));
        callback(app)
    });

    const io = socketIO.listen(httpServer)




io.sockets.on('connection', (socket) => {
    console.log('socket.io server connection');
    socket.on('schedule.created',  () => {
        // create schedules
        console.log('schedule.created - client requested this');
        registerJobs(socket)
            .then(data => {
                socket.emit('schedule.count', { count: data.length})
            })
            .catch(error => {
                socket.emit('schedule.count', { error: true})
            })


    })
})


    // Finally, start the express server
    return app

}
