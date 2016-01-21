import jsonfile from 'jsonfile'
import find from 'lodash/find'
import remove from 'lodash/remove'
import each from 'lodash/each'
import sortBy from 'lodash/sortBy'
import merge from 'lodash/merge'
import path from 'path'
import util from 'util'

// set up dev and prod paths in config for json file
// dev in same directory
// prod in json/json
let filePath = path.join(__dirname, '../../../json/jobs.json')
const defaultJSON = []

jsonfile.readFile(filePath, function(err, obj) {
    if (err) {
        jsonfile.writeFile(filePath, defaultJSON, {spaces: 2}, function(err) {
            if (err) {
                console.error(err)
            } else {
                console.log('JSON created: ' + filePath)
            }
        })
    }
})

export default class JobModel {
    constructor(properties) {
        let {cron, title, videoId, thumbnail } = properties
        this.job =  {
            created : new Date(),
            cron,
            title,
            videoId,
            thumbnail
        }
    }

    static get(callback) {
        jsonfile.readFile(filePath, (err, obj) => {
            if (err) {
                callback(err)
            } else {
                callback(null, sortBy(obj, (o) => { return o.created }))
            }
        })
    }

    static findById(id, callback) {
        jsonfile.readFile(filePath, (err, obj) => {
            if (err) {
                callback(err)
            } else {
                let result = find(obj, (o) => { return o.videoId === id })
                callback(null, result)
            }
        })
    }

    static findByIdAndUpdate(id, data, callback) {
        jsonfile.readFile(filePath, (err, obj) => {
            if (err) {
                callback(err)
            } else {
                each(obj, (o) => {
                    if (o.videoId === id) {
                        merge(o, data)
                    }
                })
                callback(null, sortBy(obj, (o) => { return o.created }))
            }
        })
    }

    static findByIdAndRemove(id, callback) {
        jsonfile.readFile(filePath, (err, obj) => {
            if (err) {
                callback(err)
            } else {
                remove(obj, (o) => {
                    return o.videoId === id
                })

                jsonfile.writeFile(filePath, obj, (err) => {
                    if (err) {
                        callback(err)
                    }else {
                        console.log('findByIdAndRemove jsonfile.writeFile', obj);

                        callback(null, sortBy(obj, (o) => { return o.created }))
                    }
                })
            }
        })
    }

    save(callback) {
        jsonfile.readFile(filePath, (err, obj) => {
            if (err) {
                callback(err)
            } else {
                obj.push(this.job)
                jsonfile.writeFile(filePath, obj,  (err) => {
                    if (err) {
                        callback(err)
                    } else {
                        callback(null, sortBy(obj, (o) => { return o.created }))
                    }
                })
            }
        })
    }
}

