if (process.env.BROWSER) {
    require('../scss/Checkboxes.scss')
}

import React, { Component, PropTypes } from 'react'
import map from 'lodash/map'




export default class Checkboxes extends React.Component {

    static propTypes = {
        options:  PropTypes.array,
        onChange: PropTypes.func
    };

    constructor() {
        super()
    }



    render() {
        const {options, onClick, defaultValue} = this.props
        return (
            <div className="Checkboxes">
                { options && options.length ? map(options, (item, i) => {
                    let id = item.name + item.value
                    let checked = defaultValue && defaultValue.indexOf(item.value) > -1 ? true : false
                    return (
                        <label htmlFor={id} key={i}><input onChange={onClick} type='checkbox' id={id} value={item.value} defaultChecked={checked}/>{item.name}</label>
                    )
                }) : null }
            </div>
        );
    }
}
