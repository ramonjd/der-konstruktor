// setTimeout. stop video at 30secs
import React, { Component, PropTypes } from 'react'
import YouTube from '../lib/YouTube'

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

export default class Player extends Component {
    static propTypes = {
        videoId:  PropTypes.string.isRequired
    };

    constructor(props) {
        super(props)
        this.state = getInitialState()
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

    render() {
        const {videoId} = this.props
        return (
            <div className='SearchContainer'>
                <h2>Selected Video</h2>
                {this.state.videoId ? <YouTube
                    videoId={videoId}
                    opts={this.state.opts}
                    onPlay={this.handlePlayVideo}
                    onPause={this.handlePauseVideo}
                    onEnd={this.handleStopVideo}
                    onReady={this.handleReadyVideo}
                /> : null}
            </div>
        )
    }
}