if (process.env.BROWSER) {
    require('../scss/SelectList.scss')
}
import React, { Component, PropTypes } from 'react'
import map from 'lodash/map'

let getInitialState = () => {
    return {
        defaultValue : null
    }
}

export default class SelectList extends React.Component {

    static propTypes = {
        options:  PropTypes.array,
        onChange: PropTypes.func,
        defaultValue : PropTypes.string
    };

    constructor() {
        super()
        this.state = getInitialState()
        this.handleChange = this.handleChange.bind(this)
    }

    componentWillReceiveProps(nextProps) {
        const {options, defaultValue} = nextProps
        this.setState({
            defaultValue : defaultValue
        })
    }

    handleChange(e){
        const {onChange} = this.props
        this.setState({
            defaultValue :e.target.value
        })
        onChange(e.target.value)
    }

    render() {
        const {options, onChange, defaultValue} = this.props
        return (
            <div className="SelectList">
                <select onChange={this.handleChange.bind(this)} value={this.state.defaultValue}>
                    { options && options.length ? map(options, (item, i) => {
                        return (
                            <option key={i} ref={'item' + i} value={item.value}>
                                {item.name}
                            </option>)
                    }) : null }
                </select>
            </div>
        );
    }
}
