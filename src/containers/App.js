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
import classNames from 'classnames'
import find from 'lodash/find'

const socket = io.connect('http://localhost:9999')

function mapStateToProps(state) {
    const { search, jobs, player } = state

    return {
        jobs : jobs.jobs,
        isFetchingJobs : jobs.isFetchingJobs,
        lastUpdatedId : jobs.lastUpdatedId,
        searchResults : search.searchResults,
        isFetchingSearchResults : search.isFetchingSearchResults,
        selectedVideoJob  : player.selectedVideoJob,
        isPlayingVideo  : player.isPlayingVideo,
        isScheduled : player.isScheduled
    }
}

function mapDispatchToProps(dispatch) {
    return { actions : bindActionCreators(actions, dispatch) }
}

@connect(mapStateToProps, mapDispatchToProps)
export default class App extends Component {

    static propTypes = {
        jobs : PropTypes.array,
        lastUpdatedId : PropTypes.string,
        isFetchingJobs : PropTypes.bool,
        searchResults : PropTypes.object,
        isFetchingSearchResults : PropTypes.bool,
        selectedVideoJob : PropTypes.object,
        isPlayingVideo : PropTypes.bool,
        isScheduled : PropTypes.bool,
        actions : PropTypes.objectOf(React.PropTypes.func).isRequired
    };

    constructor(props) {
        super(props)
        this.onSelectVideoHandler = this.onSelectVideoHandler.bind(this)
        this.onSelectJobHandler = this.onSelectJobHandler.bind(this)
        this.onUpdateScheduleHandler = this.onUpdateScheduleHandler.bind(this)
    }

    componentWillMount() {
        const {actions} = this.props

        actions.getJobs(()=> {
            socket.emit('schedule.created')
        })

        socket.on('schedule.count',  (data) => {
            console.log(data);
        })

        socket.on('schedule.trigger',  (data) => {
            actions.setVideo(data.job, true)
        })
    }

    onSelectVideoHandler(videoData){
        const {actions} = this.props
        const jobData = {
            video : videoData
        }
        actions.setVideo(jobData)
    }

    onSelectJobHandler(jobData){
        const {actions} = this.props
        actions.setVideo(jobData)
    }

    onUpdateScheduleHandler(schedule) {
        const {selectedVideoJob, actions, jobs} = this.props


        // check if schedule exists
        // lodash
        // if so, alert and don't save
        // const match = find(jobs, { 'age': 1, 'active': true });


        let updatedJob = selectedVideoJob
        updatedJob.schedule = schedule
        if (updatedJob.id) {
            actions.updateJob(updatedJob.id, updatedJob, (id)=> {
                socket.emit('schedule.created')
            })
        } else {
            actions.createJob(updatedJob, (id)=> {
                socket.emit('schedule.created')
            })
        }

        // stop playing video here

    }

    render() {
        const {isFetchingSearchResults, isPlayingVideo, isFetchingJobs, searchResults, jobs, selectedVideoJob, actions, lastUpdatedId, isScheduled} = this.props
        const mainTitle = isScheduled ? 'Stand up!' : 'Schedule me Youtube'
        const appClassName = classNames({
            'isPlayingVideo': isPlayingVideo === true,
            'isPlayingScheduled': isScheduled === true,
            'App' : true
        })

        return (
            <div className={appClassName}>
                <header>
                    <h1>{mainTitle}</h1>
                </header>
                <main>
                    <section className='flex'>
                        <div>
                            <Jobs data={jobs} lastUpdatedId={lastUpdatedId} selectedVideoJob={selectedVideoJob} isFetching={isFetchingJobs} onSelectJob={this.onSelectJobHandler} onDeleteSchedule={actions.deleteJobByVideoId} />
                        </div>
                        <div>
                            <Player selectedVideoJob={selectedVideoJob} setIsPlaying={actions.setIsPlaying} unsetVideo={actions.unsetVideo} isScheduled={isScheduled} />
                            <Scheduler onSchedule={this.onUpdateScheduleHandler} selectedVideoJob={selectedVideoJob}  isScheduled={isScheduled} />
                        </div>
                        <div>
                            <Search handleSearch={actions.search} isFetching={isFetchingSearchResults}/>
                            <SearchContainer data={searchResults} onSelectVideo={this.onSelectVideoHandler}/>
                        </div>
                    </section>
                </main>
            </div>
        )
    }
}
