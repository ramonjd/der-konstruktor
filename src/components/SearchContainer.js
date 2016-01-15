import React, { Component, PropTypes } from 'react'
import YouTube from '../lib/YouTube'
import map from 'lodash/map'
import Button from './Button'

let getInitialState = () => {
    return {
        videoId: ''
    }
}

export default class SearchContainer extends Component {
    static propTypes = {
        data:  PropTypes.object.isRequired
    };

    constructor(props) {
        super(props)
        this.state = getInitialState()
        this.handleSelectVideo = this.handleSelectVideo.bind(this)
    }

    handleSelectVideo(e) {
        this.setState({
            videoId: e.target.id
        })
    }

    render() {
        const {data} = this.props
        return (
            <div className='SearchContainer'>
                <h2>Selected Video</h2>
                <ul>
                    { data.items && data.items.length ? map(data.items, (item, i) => {
                        return (
                            <li key={ i }>
                                <img id={item.id.videoId} onClick={this.handleSelectVideo} title={item.snippet.title} src={item.snippet.thumbnails.default.url} alt={item.snippet.description} />
                            </li>)
                    }) : null }
                </ul>
                <p>Buttons: Schedule every [weekday or mon/tues/wed/thur/fri] at [time] </p>
            </div>
        )
    }
}