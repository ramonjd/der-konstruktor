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
        minute: timeUnits.MINUTES[0].value,
        showError : false,
        errorText : ''
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
            console.log('Scheduler componentWillReceiveProps', selectedVideoJob);

            this.setState({
                hour : selectedVideoJob.schedule.hour,
                minute : selectedVideoJob.schedule.minute,
                dayOfWeek : selectedVideoJob.schedule.dayOfWeek
            })
        } else {
            this.state = getInitialState()
        }
        console.log('Scheduler componentWillReceiveProps', this.state);

    }
    setDays(val, e) {
        let dayOfWeek = this.state.dayOfWeek
        if (e.target.checked === true) {
            dayOfWeek.push(val)
        } else {
            dayOfWeek = without(dayOfWeek, val)
        }
        this.setState({
            dayOfWeek: dayOfWeek.sort()
        });
        console.log('dayOfWeek', this.state.dayOfWeek);
    }

    setHour(val) {
        this.setState({hour:val});
    }

    setMinutes(val) {
        this.setState({minute: val});
    }

    scheduleHandler(e) {
        e.preventDefault()
        const {onSchedule} = this.props

        if (this.state.dayOfWeek.length === 0) {
            this.setState({
                showError : true,
                errorText : 'Hey, you need to select a day, fella!'
            });
        } else {
            this.setState({
                showError : false,
                errorText : ''
            });
            onSchedule({
                hour : this.state.hour,
                dayOfWeek : this.state.dayOfWeek,
                minute : this.state.minute
            })
        }

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
        const titleText = selectedVideoJob && selectedVideoJob.schedule ? 'Reschedule this video' : 'Schedule this video'
        const errorClass = this.state.showError === true ? 'error active' : 'error'
        return (
            <div className='Scheduler'>
                {selectedVideoJob && selectedVideoJob.video ?
                    <div>
                        <h2>{titleText}</h2>
                        <p className={errorClass}>{this.state.errorText}</p>
                        <fieldset>
                            <legend>Every</legend>
                            <Checkboxes options={timeUnits.DAYS} onChange={this.setDays} defaultValue={this.state.dayOfWeek ? this.state.dayOfWeek : null } />
                        </fieldset>
                        <fieldset>
                            <legend>At</legend>
                            <SelectList options={timeUnits.HOURS} onChange={this.setHour} defaultValue={this.state.hour ? this.state.hour : null }/>
                            <span className="divider">:</span>
                            <SelectList options={timeUnits.MINUTES} onChange={this.setMinutes} defaultValue={this.state.minute ? this.state.minute : null }/>
                        </fieldset>
                        <Button onClick={this.scheduleHandler}>Schedule</Button>
                    </div>
                  : null}
            </div>
        )
    }
}

