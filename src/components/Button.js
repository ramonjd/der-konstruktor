if (process.env.BROWSER) {
    require('../scss/Button.scss')
}

import React, { Component, PropTypes } from 'react'

export default class Button extends Component {
    static propTypes = {
        children: PropTypes.node,
        className : PropTypes.string,
        disabled : PropTypes.bool,
        title : PropTypes.string,
        onClick : PropTypes.func,
        type : PropTypes.string
    };
    render() {
        let newClassName = this.props.className || ''
        let newTitle = this.props.title || ''
        let type = this.props.type || 'Button'
        let onClick = this.props.onClick || (() => {})
        let disabled = this.props.disabled || false

        return (
            <button type={type} className={newClassName} disabled={disabled} onClick={onClick} title={newTitle}>{this.props.children}</button>
        )
    }
}