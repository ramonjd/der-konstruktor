import schedule from 'node-schedule'
import JSONFile from 'json-file'
import each from 'lodash/each'


// https://github.com/node-schedule/node-schedule
/*
 {
 "jobs" : [
 {
 "title": "Test",
 "minute" : 0,
 "hour": 9,
 "dayOfMonth": "*",
 "month" : "*",
 "dayOfWeek": "*",
 "videoId" : "e01xjNoD4FM",
 "start" : 0,
 "end" : 0
 }
 ]
 }*/

let currentJobs = []

export function loadJobs() {
    let jsonFile = JSONFile.read('../json/jobs.json')
    let jobs = this.jsonFile.get('jobs') || null
    if (!jobs) {
        jsonFile.set('jobs', [])
    }
    each(jobs, (job, i) => {
        //let cron = [
        //    job.minute,
        //    job.hour,
        //    job.dayOfMonth,
        //    job.month,
        //    job.dayOfWeek
        //]
        //let j = schedule.scheduleJob(cron.join(' '), ()=> {
        //    // play job.videoId job.title job.start job.end
        //})
        currentJobs.push[j]
    })
}


export function getJobs() {
    return currentJobs
}

