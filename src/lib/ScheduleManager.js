import schedule from 'node-schedule'
import forEach from 'lodash/forEach'
import jsonfile from 'jsonfile'
import path from 'path'

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
                    console.log(obj)

                    let scheduledJobCallback = (videoId) => {
                        let callback = () => {
                            socket.emit('schedule.trigger', { videoId: videoId })
                        }
                        return callback
                    }

                    forEach(obj, (job) => {
                        let j = schedule.scheduleJob(job.cron, scheduledJobCallback(job.videoId))
                        scheduledJobs.push(j)

                    })
                    resolve(scheduledJobs)
                }
            })





        })



}

