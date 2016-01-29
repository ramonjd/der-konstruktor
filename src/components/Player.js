// setTimeout. stop video at 30secs
import React, { Component, PropTypes } from 'react'
import YouTube from '../lib/YouTube'

let getInitialState = () => {
    return {
        playbackState: 'stopped',
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
        video:  PropTypes.object
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

        const {setIsPlaying} = this.props
        this.setState({
            playbackState: 'playing'
        })
        setIsPlaying(true)
    }

    handlePauseVideo(e) {
        const {setIsPlaying} = this.props
        this.setState({
            playbackState: 'paused'
        })
        setIsPlaying(false)
    }

    handleStopVideo(e) {
        const {setIsPlaying} = this.props
        this.setState({
            playbackState: 'stopped'
        })
        setIsPlaying(false)
    }

    handleReadyVideo(e) {

    }

    render() {
        const {video} = this.props
        console.log('Player render', video);
        return (
            <div className='SearchContainer'>
                {video && video.id ? <YouTube
                    videoId={video.id.videoId}
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