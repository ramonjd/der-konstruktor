import React, { Component, PropTypes } from 'react'
import map from 'lodash/map'
import Button from './Button'

export default class Jobs extends Component {

    static propTypes = {
        data:  PropTypes.array
    };

    constructor(props) {
        super(props)
    }

    render() {
        const {data} = this.props
        console.log('Jobs', data)
        return (
            <div className='Jobs'>
                <h2>Jobs</h2>
                <ul>
                    { data && data.length ? map(data, (item, i) => {
                        return (
                            <li key={ i }>
                                {item.title}
                                <Button>Delete</Button>
                            </li>)
                    }) : null }
                </ul>
            </div>
        )
    }
}