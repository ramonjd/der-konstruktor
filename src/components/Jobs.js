if (process.env.BROWSER) {

    require('../scss/Jobs.scss')
}

import React, { Component, PropTypes } from 'react'
import map from 'lodash/map'
import forEach from 'lodash/forEach'
import Button from './Button'
import classNames from 'classnames'
import {timeUnits} from '../constants/'

export default class Jobs extends Component {

    static propTypes = {
        data: PropTypes.array,
        selectedVideoJob : PropTypes.object,
        onSelectJob : PropTypes.func,
        onDeleteSchedule : PropTypes.func,
        lastUpdatedId : PropTypes.string
    };

    constructor(props) {
        super(props)
        this.parseSchedule = this.parseSchedule.bind(this)
        this.generateListItemClassName = this.generateListItemClassName.bind(this)
    }


    parseSchedule(cron) {
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

    generateListItemClassName(id) {
        const {selectedVideoJob, lastUpdatedId, isFetching} = this.props
        return classNames({
            'active': selectedVideoJob && selectedVideoJob.id === id,
            'flash': lastUpdatedId && lastUpdatedId === id && isFetching !== true
        })
    }

    render() {
        const {data, onDeleteSchedule, onSelectJob} = this.props
        return (
            <div className='Jobs'>
                <h2>Scheduled Jobs</h2>
                <ul>
                    { data && data.length ? map(data, (item, i) => {
                        return (
                            <li key={ i } id={item.id} className={this.generateListItemClassName(item.id)}>
                                <img title={item.video.snippet.title} src={item.video.snippet.thumbnails.default.url} alt={item.video.snippet.title} onClick={onSelectJob.bind(this, item)}/>
                                <div>
                                    <h4>{item.video.snippet.title}</h4>
                                    {this.parseSchedule(item.schedule)}
                                    <Button onClick={onDeleteSchedule.bind(this, item.id)}>Delete</Button>
                                </div>
                            </li>)
                    }) : null }
                </ul>
            </div>
        )
    }
}