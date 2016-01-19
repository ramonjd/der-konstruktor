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

    parseCron(cronString) {
        const cronData = Cron.parse(cronString)
        console.log(cronData);
        let daysString = ''
        forEach(cronData.days, (value, key) => {
            daysString += timeUnits.DAY_MAP[value] + ' '
        })
        if (daysString !== '') {
            daysString += ' at '
        }
        return (<div className="JobTime">
            <h3>Scheduled for:</h3>
            <p><strong>{daysString} {cronData.startTime}</strong></p>
        </div>)
    }

    render() {
        const {data, onDeleteSchedule} = this.props

        return (
            <div className='Jobs'>
                <h2>Jobs</h2>
                <ul>
                    { data && data.length ? map(data, (item, i) => {
                        return (
                            <li key={ i }>
                                {item.title} {this.parseCron(item.cron)}
                                <img title={item.title} src={item.thumbnail} alt={item.title}/>
                                <Button onClick={onDeleteSchedule.bind(this, item.videoId)}>Delete</Button>
                            </li>)
                    }) : null }
                </ul>
            </div>
        )
    }
}