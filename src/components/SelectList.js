if (process.env.BROWSER) {
    require('../scss/SelectList.scss')
}
import React, { Component, PropTypes } from 'react'
import map from 'lodash/map'

export default class SelectList extends React.Component {

    static propTypes = {
        options:  PropTypes.array,
        onChange: PropTypes.func
    };

    constructor() {
        super()
    }

    render() {
        const {options, onChange} = this.props
        return (
            <div className="SelectList">
                <select onChange={onChange} defaultValue={options[0].value}>
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
