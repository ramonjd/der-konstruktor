import React, { Component, PropTypes } from 'react'

export default class Button extends Component {
    static propTypes = {
        children: PropTypes.node,
        className : PropTypes.string,
        title : PropTypes.string,
        onClick : PropTypes.func,
        type : PropTypes.string
    };
    render() {
        let newClassName = this.props.className || ''
        let newTitle = this.props.title || ''
        let type = this.props.type || 'button'
        let onClick = this.props.onClick || (() => {})
        return (
            <button type={type} className={newClassName} onClick={onClick} title={newTitle}>{this.props.children}</button>
        )
    }
}