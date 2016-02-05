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

const socket = io.connect('http://localhost:9999')

function mapStateToProps(state) {
    const { search, jobs, player } = state


/*

    jobs : jobs.results,
    isFetchingJobs : jobs.isFetchingJobs,
    searchResults : search.searchResults,
    isFetchingSearchResults : search.isFetchingSearchResults,
    selectedVideoJob  : player.selectedVideoJob,
    isPlayingVideo  : player.isPlayingVideo


     jobs : PropTypes.array,
     isFetchingJobs : PropTypes.bool,
     searchResults : PropTypes.array,
     isFetchingSearchResults : PropTypes.bool,
     selectedVideoJob : PropTypes.object,
     isPlayingVideo : PropTypes.bool


    */



    return {
        jobs : jobs.jobs,
        isFetchingJobs : jobs.isFetchingJobs,
        searchResults : search.searchResults,
        isFetchingSearchResults : search.isFetchingSearchResults,
        selectedVideoJob  : player.selectedVideoJob,
        isPlayingVideo  : player.isPlayingVideo
    }
}

function mapDispatchToProps(dispatch) {
    return { actions : bindActionCreators(actions, dispatch) }
}

@connect(mapStateToProps, mapDispatchToProps)
export default class App extends Component {

    static propTypes = {
        jobs : PropTypes.array,
        isFetchingJobs : PropTypes.bool,
        searchResults : PropTypes.object,
        isFetchingSearchResults : PropTypes.bool,
        selectedVideoJob : PropTypes.object,
        isPlayingVideo : PropTypes.bool,
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
            console.log('schedule.trigger from socket', data)
            actions.setVideo(data.job)
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
        const {selectedVideoJob, actions} = this.props

        let updatedJob = selectedVideoJob

        updatedJob.schedule = schedule

        if (updatedJob.id) {
            actions.updateJob(updatedJob.id, updatedJob, ()=> {
                socket.emit('schedule.created')
            })
        } else {
            actions.createJob(updatedJob, ()=> {
                socket.emit('schedule.created')
            })
        }
        actions.unsetVideo()
    }

    render() {
        const {isFetchingSearchResults, isFetchingJobs, searchResults, jobs, selectedVideoJob, actions} = this.props
        return (
            <div className='App'>
                <header>
                    <h1>Schedule me Youtube</h1>
                </header>
                <main>
                    <section className="flex">
                        <div>
                            <Jobs data={jobs} selectedVideoJob={selectedVideoJob} isFetching={isFetchingJobs} onSelectJob={this.onSelectJobHandler} onDeleteSchedule={actions.deleteJobByVideoId} />
                        </div>
                        <div>
                            <Player selectedVideoJob={selectedVideoJob} setIsPlaying={actions.setIsPlaying} selectScheduleHandler={this.onSelectScheduleHandler}/>
                            <Scheduler onSchedule={this.onUpdateScheduleHandler} selectedVideoJob={selectedVideoJob} />
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
