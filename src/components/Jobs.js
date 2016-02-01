if (process.env.BROWSER) {
    require('../scss/Jobs.scss')
}

import React, { Component, PropTypes } from 'react'
import map from 'lodash/map'
import forEach from 'lodash/forEach'
import Button from './Button'
import Cron from 'cron.js'
import {timeUnits} from '../constants/'

export default class Jobs extends Component {

    static propTypes = {
        data: PropTypes.array
    };

    constructor(props) {
        super(props)
        this.parseCron = this.parseCron.bind(this)
    }

    parseCron(cron) {
        // 45 13 * * 4-5
        let startTime = cron.hour + ':' + (cron.minute.length === 1 ? '0' + cron.minute : cron.minute)

        let daysString = ''
        forEach(cron.dayOfWeek, (value, key) => {
            daysString += timeUnits.DAY_MAP[value] + ' '
        })
        if (daysString !== '') {
            startTime = ' at ' + startTime
        }
        return (<div className="JobTime">
            <p><em>Every {daysString} {startTime}</em></p>
        </div>)
    }

    render() {
        const {data, onDeleteSchedule, onSelectJob, selectedJob} = this.props
        return (
            <div className='Jobs'>
                <h2>Scheduled Jobs</h2>
                <ul>
                    { data && data.length ? map(data, (item, i) => {
                        return (
                            <li key={ i } id={item.id} className={selectedJob && selectedJob.id === item.id ? 'active' : ''}>
                                <img title={item.video.snippet.title} src={item.video.snippet.thumbnails.default.url} alt={item.video.snippet.title} onClick={onSelectJob.bind(this, item)}/>
                                <div>
                                    <h4>{item.video.snippet.title}</h4>
                                    {this.parseCron(item.cron)}
                                    <Button onClick={onDeleteSchedule.bind(this, item.id)}>Delete</Button>
                                </div>
                            </li>)
                    }) : null }
                </ul>
            </div>
        )
    }
}