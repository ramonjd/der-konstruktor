import React, { Component, PropTypes } from 'react'
import YouTube from '../lib/YouTube'
import Button from './Button'

let getInitialState = () => {
    return {
        playbackState: 'stopped',
        videoId: '',
        opts : {
            width: 320,
            height: 180,
            playerVars: {
                autoplay : 1,
                start : 0,
                end : 25
            }
        }
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
        this.handleReadyVideo = this.handleReadyVideo.bind(this)
        this.handleStopVideo = this.handleStopVideo.bind(this)
        this.handlePauseVideo = this.handlePauseVideo.bind(this)
        this.handlePlayVideo = this.handlePlayVideo.bind(this)
    }

    handlePlayVideo(e) {
        this.setState({
            playbackState: 'playing'
        })
    }

    handlePauseVideo(e) {
        this.setState({
            playbackState: 'paused'
        })
    }

    handleStopVideo(e) {
        this.setState({
            playbackState: 'stopped'
        })
    }

    handleReadyVideo(e) {

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
                {this.state.videoId ? <YouTube
                    videoId={this.state.videoId}
                    opts={this.state.opts}
                    onPlay={this.handlePlayVideo}
                    onPause={this.handlePauseVideo}
                    onEnd={this.handleStopVideo}
                    onReady={this.handleReadyVideo}
                /> : null}
                <Button>Schedule this video  {this.state.videoId}</Button>
                <ul>
                    { data.items && data.items.length ? data.items.map((item, i) => {
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