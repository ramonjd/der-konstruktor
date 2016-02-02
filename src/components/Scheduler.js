if (process.env.BROWSER) {
    require('../scss/Scheduler.scss')
}

import React, { Component, PropTypes } from 'react'
import Button from './Button'
import SelectList from './SelectList'
import Checkboxes from './Checkboxes'
import {timeUnits} from '../constants/'
import without from 'lodash/without'
import Cron from 'cron.js'


/*

 import Cron from 'cron.js'


 let data = {
 days: [1, 2, 3, 4, 5, 6],
 startTime: '18:30:00'
 };


 // make
 new Cron( data, { shorten: true } ).expression;        //  '* 30 18 * * 1-6 *'
 new Cron( data, { numeric: false } ).expression;        //  '* 30 18 * * SUN,MON,TUE,WED,THU,FRI *'
 new Cron( { days: ['FRI', 'SAT'] } ).expression;        //  '* * * * * 6,7 *'
 Cron.make( data, { numeric: false, shorten: true } );  //  '* 30 18 * * SUN-FRI *'

 //parse
 Cron.parse('* 30 18 * * 1-3');    // { days: [1, 2, 3], startTime: '18:30:00' }
 Cron.parse('* 30 18 * * 1,3,6');  // { days: [1, 3, 6], startTime: '18:30:00' }
 Cron.parse('* * 12 * * SUN-SAT'); // { days: [1, 2, 3, 4, 5, 6, 7], startTime: '12:00:00' }
 */

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
        selectedJob:  PropTypes.object,
        selectedVideo:  PropTypes.object,
        onSchedule:  PropTypes.func
    };

    constructor() {
        super()
        this.state = getInitialState()
        this.setDays = this.setDays.bind(this)
        this.setHour = this.setHour.bind(this)
        this.setMinutes = this.setMinutes.bind(this)
        this.scheduleHandler = this.scheduleHandler.bind(this)
        this.updateHandler = this.updateHandler.bind(this)
    }
    componentWillReceiveProps(nextProps) {
        const {selectedJob} = nextProps

        if (selectedJob && selectedJob.cron) {
            this.setState({
                hour : selectedJob.cron.hour,
                minute : selectedJob.cron.minute,
                dayOfWeek : selectedJob.cron.dayOfWeek
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
        // validate here
        // check for existing cron at this time

        const {onSchedule} = this.props
       /* const timeData = {
            dayOfWeek: this.state.dayOfWeek,
            startTime: this.state.hour + ':' + this.state.minute + ':00'
        }

        const dayString = this.state.dayOfWeek.length > 1 ? this.state.dayOfWeek.join(',')  : this.state.dayOfWeek[0];
        const cronExpression =  cronPattern.replace('%minute%', this.state.minute).replace('%hour%', this.state.hour).replace('%dayOfWeek%', dayString)
        console.log(cronExpression)
        //const cronString = new Cron(timeData).expression;
        console.log(this.state)

        // testing with RecurrenceRule*/
        onSchedule(this.state)

    }


    updateHandler(e) {
        e.preventDefault()
        const {onUpdate} = this.props
        onUpdate(this.state)

    }

    setJobState(cron){
        this.setState({
            dayOfWeek: cron.dayOfWeek,
            hour: cron.hour,
            minute: cron.minute
        });
    }

    render() {
        const {selectedJob, selectedVideo} = this.props

        let buttonClickHandler = this.scheduleHandler

        if (selectedJob && selectedJob.cron) {
            buttonClickHandler = this.updateHandler
        }
console.log('render scheduler', selectedJob)
        return (
            <div className="Scheduler">
                {selectedJob && selectedJob.id ?
                    <div>
                        <h2>Schedule this video</h2>
                        <h3>Every</h3>
                        <Checkboxes options={timeUnits.DAYS} onClick={this.setDays} defaultValue={this.state.dayOfWeek ? this.state.dayOfWeek : null } />
                        <h3>At</h3>
                        <SelectList options={timeUnits.HOURS} onChange={this.setHour} defaultValue={this.state.hour ? this.state.hour : null }/>
                        <span className="divider">:</span>
                        <SelectList options={timeUnits.MINUTES} onChange={this.setMinutes} defaultValue={this.state.minute ? this.state.minute : null }/>
                        <Button onClick={buttonClickHandler}>Schedule</Button>
                    </div>
                  : null}
            </div>
        )
    }
}