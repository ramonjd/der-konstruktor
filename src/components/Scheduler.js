if (process.env.BROWSER) {
    require('../scss/Scheduler.scss')
}

import React, { Component, PropTypes } from 'react'
import Button from './Button'
import SelectList from './SelectList'
import Checkboxes from './Checkboxes'
import {timeUnits} from '../constants/'
import without from 'lodash/without'


let getInitialState = () => {
    return {
        dayOfWeek: [],
        hour: timeUnits.HOURS[0].value,
        minute: timeUnits.MINUTES[0].value
    }
}

let cronPattern = '%minute% %hour% * * %dayOfWeek%'

export default class Scheduler extends Component {

    static propTypes = {
        selectedVideoJob:  PropTypes.object,
        onSchedule:  PropTypes.func
    };

    constructor() {
        super()
        this.state = getInitialState()
        this.setDays = this.setDays.bind(this)
        this.setHour = this.setHour.bind(this)
        this.setMinutes = this.setMinutes.bind(this)
        this.scheduleHandler = this.scheduleHandler.bind(this)
    }
    componentWillReceiveProps(nextProps) {
        const {selectedVideoJob} = nextProps

        if (selectedVideoJob && selectedVideoJob.schedule) {
            this.setState({
                hour : selectedVideoJob.schedule.hour,
                minute : selectedVideoJob.schedule.minute,
                dayOfWeek : selectedVideoJob.schedule.dayOfWeek
            })
            console.log('Scheduler componentWillMount', this.state);

        }

    }
    setDays(e) {
        let dayOfWeek = this.state.dayOfWeek
        if (e.target.checked === true) {
            dayOfWeek.push(e.target.value)
        } else {
            dayOfWeek = without(dayOfWeek, e.target.value)
        }
        this.setState({dayOfWeek: dayOfWeek.sort()});
    }

    setHour(e) {
        this.setState({hour: e.target.value});
    }

    setMinutes(e) {
        this.setState({minute: e.target.value});
    }

    scheduleHandler(e) {
        e.preventDefault()
        const {onSchedule} = this.props
        onSchedule(this.state)
    }

    setJobState(cron){
        this.setState({
            dayOfWeek: cron.dayOfWeek,
            hour: cron.hour,
            minute: cron.minute
        });
    }

    render() {
        const {selectedVideoJob} = this.props

        return (
            <div className="Scheduler">
                {selectedVideoJob && selectedVideoJob.video ?
                    <div>
                        <h2>Schedule this video</h2>
                        <h3>Every</h3>
                        <Checkboxes options={timeUnits.DAYS} onClick={this.setDays} defaultValue={this.state.dayOfWeek ? this.state.dayOfWeek : null } />
                        <h3>At</h3>
                        <SelectList options={timeUnits.HOURS} onChange={this.setHour} defaultValue={this.state.hour ? this.state.hour : null }/>
                        <span className="divider">:</span>
                        <SelectList options={timeUnits.MINUTES} onChange={this.setMinutes} defaultValue={this.state.minute ? this.state.minute : null }/>
                        <Button onClick={this.scheduleHandler}>Schedule</Button>
                    </div>
                  : null}
            </div>
        )
    }
}