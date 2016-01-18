if (process.env.BROWSER) {
    require('../scss/App.scss')
}
import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actions  from '../actions/'
import Search from '../components/Search'
import SearchContainer from '../components/SearchContainer'
import Jobs from '../components/Jobs'
import Player from '../components/Player'
import Scheduler from '../components/Scheduler'



function mapStateToProps(state) {
    const { search, jobs } = state

    return {
        jobs : jobs.results,
        isFetchingJobs : jobs.isFetching,
        videos : search.results,
        isFetchingVideos : search.isFetching,
        selectedVideo : search.selected
    }
}

function mapDispatchToProps(dispatch) {
    return { actions : bindActionCreators(actions, dispatch) }
}


@connect(mapStateToProps, mapDispatchToProps)
export default class App extends Component {

    static propTypes = {
        jobs:  PropTypes.array,
        videos:  PropTypes.object.isRequired,
        selectedVideo:  PropTypes.object,
        isFetchingJobs:  PropTypes.bool,
        isFetchingVideos:  PropTypes.bool,
        actions : PropTypes.objectOf(React.PropTypes.func).isRequired
    };

    constructor(props) {
        super(props)
        this.onSelectVideoHandler = this.onSelectVideoHandler.bind(this)
        this.onSelectScheduleHandler = this.onSelectScheduleHandler.bind(this)
    }

    componentWillMount() {
        this.props.actions.getJobs()
    }

    onSelectVideoHandler(videoId){
        this.props.actions.selectVideo(videoId)
    }

    onSelectScheduleHandler(schedule){
        const {selectedVideo} = this.props
        console.log('App : onSelectScheduleHandler', schedule);
        //this.props.actions.selectVideo(videoId)
    }

    render() {
        const {isFetchingVideos, isFetchingJobs, videos, jobs, selectedVideo, actions} = this.props
        return (
            <div className='App'>
                <header>
                    <h1>App</h1>
                </header>
                <main>
                    <section>
                        <p>Current Crons</p>
                        <Jobs data={jobs} isFetching={isFetchingJobs} />
                        <Player video={selectedVideo} />
                        {selectedVideo && selectedVideo.id ? <Scheduler onSchedule={this.onSelectScheduleHandler}/> : null}
                        <Search handleSearch={actions.search} isFetching={isFetchingVideos}/>
                        <SearchContainer data={videos} onSelectVideo={this.onSelectVideoHandler}/>
                    </section>
                </main>
            </div>
        )
    }
}
