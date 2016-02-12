if (process.env.BROWSER) {
    require('../scss/Checkboxes.scss')
}

import React, { Component, PropTypes } from 'react'
import map from 'lodash/map'


let getInitialState = () => {
    return {

    }
}

export default class Checkboxes extends React.Component {

    static propTypes = {
        options:  PropTypes.array,
        onChange: PropTypes.func
    };

    constructor() {
        super()
        this.state = getInitialState()
        this.handleChange = this.handleChange.bind(this)
    }

    componentWillReceiveProps(nextProps) {
        const {options, defaultValue} = nextProps
        if (options && options.length) {
            map(options, (item, i) => {
                let nextState = {}
                nextState[item.value] = defaultValue && defaultValue.indexOf(item.value) > -1 ? true : false
                this.setState(nextState)
            })
        }
    }

    handleChange(val, e){
        const {onChange} = this.props
        let nextState = {}
        nextState[val] = e.target.checked
        this.setState(nextState)
        onChange(val, e)
    }


    render() {
        const {options, defaultValue} = this.props
        return (
            <div className="Checkboxes">
                { options && options.length ? map(options, (item, i) => {
                    let id = item.name + item.value
                    return (
                        <div className='checkboxesContainer' key={i}>
                            <div className='switch'>
                                <input onChange={this.handleChange.bind(this, item.value)} type='checkbox' id={id} checked={this.state[item.value]}/>
                                <span></span>
                            </div>
                            <label htmlFor={id}>{item.name}</label>
                        </div>
                    )
                }) : null }
            </div>
        );
    }
}
