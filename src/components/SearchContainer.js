import React, { Component, PropTypes } from 'react'
import YoutubePlayer from 'react-youtube-player';


let getInitialState = () => {
    return {
        selectedVideoId: ''
    }
}

export default class SearchContainer extends Component {
    static propTypes = {
        data:  PropTypes.object.isRequired
    };

    constructor(props) {
        super(props)
        this.state = getInitialState()
        this.handleClick = this.handleClick.bind(this)

    }


    handleClick(e) {
        console.log(e.target);
        this.setState({selectedVideoId: e.target.id})
    }

    render() {
        const {data} = this.props
        console.log('SearchContainer', data);
        return (
            <div className='SearchContainer'>
                <YoutubePlayer
                    videoId={this.state.selectedVideoId}
                    playbackState='unstarted'
                    configuration={
                        {
                            showinfo: 0,
                            controls: 0
                        }
                    }
                />
                <ul>
                    { data.items && data.items.length ? data.items.map((item, i) => {
                        return (
                            <li key={ i }>
                                <img id={item.id.videoId} onClick={this.handleClick} title={item.snippet.title} src={item.snippet.thumbnails.default.url} alt={item.snippet.description} />

                            </li>)
                    }) : null }
                </ul>
            </div>
        )
    }

}