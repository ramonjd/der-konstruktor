import schedule from 'node-schedule'
import forEach from 'lodash/forEach'
import jsonfile from 'jsonfile'
import path from 'path'
import map from 'lodash/map'

let filePath = path.join(__dirname, '../../json/jobs.json')
let scheduledJobs = []



/*

{
    cron : '',
    callback : ()=>{}
}

*/

export function clearJobs(jobs){
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
                    console.error(err)
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

                        let rule = new schedule.RecurrenceRule()
                        rule.dayOfWeek = map(job.cron.dayOfWeek, (item) => {return parseInt(item)})
                        rule.hour = parseInt(job.cron.hour)
                        rule.minute = parseInt(job.cron.minute)

                        var j = schedule.scheduleJob(rule, scheduledJobCallback(job))


/*
                        let j = schedule.scheduleJob(job.cron, scheduledJobCallback(job))
*/
                        scheduledJobs.push(j)

                    })
                    resolve(scheduledJobs)
                }
            })





        })



}

