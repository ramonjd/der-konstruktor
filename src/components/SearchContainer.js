import React, { Component, PropTypes } from 'react'
import YoutubePlayer from 'react-youtube-player';


let getInitialState = () => {
    return {
        playbackState: 'unstarted',
        videoId: '',
        width: 320,
        height: 180
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

    handlePlayVideo() {
        this.setState({
            playbackState: 'playing'
        })
    }

    handlePauseVideo() {
        this.setState({
            playbackState: 'paused'
        })
    }

    handleStopVideo() {
        this.setState({
            playbackState: 'unstarted'
        })
    }
    handleSelectVideo(e) {
        console.log(e.target)
        this.setState({
            videoId: e.target.id
        })
        setTimeout(()=>{
            this.handlePlayVideo()
        },500)
    }

    render() {
        const {data} = this.props
        console.log('SearchContainer', data);
        return (
            <div className='SearchContainer'>
                <h2>Selected Video ID: {this.state.videoId}</h2>
                {this.state.videoId ? <YoutubePlayer
                    {...this.state}
                /> : null}
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