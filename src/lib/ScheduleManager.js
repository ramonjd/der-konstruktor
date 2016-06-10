import schedule from 'node-schedule'
import forEach from 'lodash/forEach'
import jsonfile from 'jsonfile'
import path from 'path'
import map from 'lodash/map'

const filePath = path.join(__dirname, '../../json/jobs.json')
const cronPattern = '{minute} {hour} * * {dayOfWeek}'
let scheduledJobs = []

export function clearJobs(){
    forEach(scheduledJobs, (job) => {
        if (job) {
            job.cancel()
        }
    })
    scheduledJobs = []
    return scheduledJobs
}

export function registerJobs(socket){

   return new Promise(
        function (resolve, reject) {


            jsonfile.readFile(filePath, (err, obj) => {
                if (err) {
                    reject(err)
                } else {

                    clearJobs()

                    let scheduledJobCallback = (job) => {
                        let callback = () => {
                            socket.emit('schedule.trigger', { job: job })
                        }
                        return callback
                    }


                    forEach(obj, (job) => {

                        let rule = cronPattern.replace('{minute}', job.schedule.minute).replace('{hour}', job.schedule.hour).replace('{dayOfWeek}', job.schedule.dayOfWeek.join(','))
                        let j = schedule.scheduleJob(rule, scheduledJobCallback(job))

                        scheduledJobs.push(j)

                    })
                    resolve(scheduledJobs)
                }
            })





        })



}

