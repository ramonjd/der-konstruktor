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
        days: [],
        hour: timeUnits.HOURS[0].value,
        minutes: timeUnits.MINUTES[0].value
    }
}

let cronPattern = '%minutes% %hour% * * %day%'

export default class Scheduler extends Component {
    static propTypes = {};

    constructor() {
        super()
        this.state = getInitialState()
        this.setDays = this.setDays.bind(this)
        this.setHour = this.setHour.bind(this)
        this.setMinutes = this.setMinutes.bind(this)
        this.buttonClickHandler = this.buttonClickHandler.bind(this)
    }

    setDays(e) {
        let days = this.state.days
        if (e.target.checked === true) {
            days.push(e.target.value)
        } else {
            days = without(days, e.target.value)
        }
        this.setState({days: days.sort()});
    }

    setHour(e) {
        this.setState({hour: e.target.value});
    }

    setMinutes(e) {
        this.setState({minutes: e.target.value});
    }

    buttonClickHandler(e) {

        // validate here

        const {onSchedule} = this.props
        const timeData = {
            days: this.state.days,
            startTime: this.state.hour + ':' + this.state.minutes + ':00'
        }

        const dayString = this.state.days.length > 1 ? this.state.days[0] + '-' + this.state.days[this.state.days.length-1]  : this.state.days[0];
        const cronExpression =  cronPattern.replace('%minutes%', this.state.minutes).replace('%hour%', this.state.hour).replace('%day%', dayString)
console.log(cronExpression)
        //const cronString = new Cron(timeData).expression;
        onSchedule(cronExpression)
        e.preventDefault()
    }

    render() {
        return (
            <div className="Scheduler">
                <h2>Schedule this video</h2>
                <h3>Every</h3>
                <Checkboxes options={timeUnits.DAYS} onClick={this.setDays}/>
                <h3>At</h3>
                <SelectList options={timeUnits.HOURS} onChange={this.setHour}/>
                <span>:</span>
                <SelectList options={timeUnits.MINUTES} onChange={this.setMinutes}/>
                <Button onClick={this.buttonClickHandler}>Schedule</Button>
            </div>
        )
    }
}