if (process.env.BROWSER) {
    require('../scss/Player.scss')
}

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
        selectedVideoJob:  PropTypes.object
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
        console.log('VIDEO PLAY')
        const {setIsPlaying} = this.props
        this.setState({
            playbackState: 'playing'
        })
        setIsPlaying(true)
    }

    handlePauseVideo(e) {
        console.log('VIDEO PAUSED')
        const {setIsPlaying} = this.props
        this.setState({
            playbackState: 'paused'
        })
        setIsPlaying(false)
    }

    handleStopVideo(e) {
        console.log('VIDEO STOP')
        const {setIsPlaying} = this.props
        this.setState({
            playbackState: 'stopped'
        })
        setIsPlaying(false)
    }

    handleReadyVideo(e) {

    }


    render() {
        const {selectedVideoJob} = this.props
        return (
            <div className='Player'>
                {selectedVideoJob && selectedVideoJob.video ?
                    <YouTube
                            videoId={selectedVideoJob.video.id.videoId}
                            opts={this.state.opts}
                            onPlay={this.handlePlayVideo}
                            onPause={this.handlePauseVideo}
                            onEnd={this.handleStopVideo}
                            onReady={this.handleReadyVideo}
                        />

                  : null}
            </div>
        )
    }
}