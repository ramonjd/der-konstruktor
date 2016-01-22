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
        e.preventDefault()
        const {onSelectVideo} = this.props
        this.setState({
            videoId: e.target.id
        })
        onSelectVideo(e.target.id)
    }

    render() {
        const {data} = this.props
        return (
            <div className='SearchContainer'>
                <h2>Selected Video</h2>
                <ul>
                    { data.items && data.items.length ? map(data.items, (item, i) => {
                        if (item.id.videoId) {
                            return (
                                <li key={ i } className={item.id.videoId === this.state.videoId ? 'active' : ''} id={item.id.videoId} onClick={this.handleSelectVideo} >
                                    <h3>{item.snippet.title}</h3>
                                    <img title={item.snippet.title} src={item.snippet.thumbnails.default.url} alt={item.snippet.description} />
                                </li>)
                        }
                    }) : null }
                </ul>
            </div>
        )
    }
}