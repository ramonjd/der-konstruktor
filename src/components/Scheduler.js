import React, { Component, PropTypes } from 'react'
import Button from './Button'
import SelectList from './SelectList'
import Checkboxes from './Checkboxes'
import {timeUnits} from '../constants/'
import without from 'lodash/without'


let getInitialState = () => {
    return {
        days : [],
        hour : timeUnits.HOURS[0].value,
        minute : timeUnits.MINUTES[0].value
    }
}


export default class Scheduler extends Component {
    static propTypes = {

    };

    constructor() {
        super()
        this.state = getInitialState()
        this.setDays = this.setDays.bind(this)
        this.setHour = this.setHour.bind(this)
        this.setMinute = this.setMinute.bind(this)
        this.buttonClickHandler = this.buttonClickHandler.bind(this)
    }
    componentWillMount() {
        // if jobs, then schedule them
        // https://github.com/node-schedule/node-schedule
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

    setMinute(e) {
        this.setState({minute: e.target.value});
    }

    buttonClickHandler(e) {
        const {onSchedule} = this.props
        e.preventDefault()
        onSchedule(this.state)
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
                <SelectList options={timeUnits.MINUTES} onChange={this.setMinute}/>
                <Button onClick={this.buttonClickHandler}>Schedule</Button>
            </div>
        )
    }
}