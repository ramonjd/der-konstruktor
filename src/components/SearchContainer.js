if (process.env.BROWSER) {
    require('../scss/SearchContainer.scss')
}

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

    handleSelectVideo(data, e) {
        e.preventDefault()
        const {onSelectVideo} = this.props
        this.setState({
            videoId: data.id.videoId
        })
        onSelectVideo(data)
    }

    render() {
        const {data} = this.props
        return (
            <div className='SearchContainer'>
                <ul>
                    { data.items && data.items.length ? map(data.items, (item, i) => {
                        if (item.id.videoId) {
                            return (
                                <li key={ i } className={item.id.videoId === this.state.videoId ? 'active' : ''} id={item.id.videoId}>
                                    <figure onClick={this.handleSelectVideo.bind(this, item)}>
                                        <img title={item.snippet.title} src={item.snippet.thumbnails.default.url} alt={item.snippet.description} />
                                        <figcaption>
                                            <h4>{item.snippet.title}</h4>
                                            <p>{item.snippet.description}</p>
                                        </figcaption>
                                    </figure>
                                </li>)
                        }
                    }) : null }
                </ul>
            </div>
        )
    }
}