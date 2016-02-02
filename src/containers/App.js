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

    return {
        jobs : jobs.results,
        isFetchingJobs : jobs.isFetching,
        videos : search.results,
        isFetchingVideos : search.isFetching,
        selectedVideo : player.video,
        selectedJob : jobs.selectedJob,
        isPlaying : player.isPlaying
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
        isPlaying:  PropTypes.bool,
        selectedJob:  PropTypes.object,
        actions : PropTypes.objectOf(React.PropTypes.func).isRequired
    };

    constructor(props) {
        super(props)
        this.onSelectVideoHandler = this.onSelectVideoHandler.bind(this)
        this.onSelectJobHandler = this.onSelectJobHandler.bind(this)
        this.onSelectScheduleHandler = this.onSelectScheduleHandler.bind(this)
        this.onSelectScheduleHandler = this.onSelectScheduleHandler.bind(this)
    }

    componentWillMount() {
        const {actions} = this.props

        actions.getJobs()

        socket.emit('schedule.created')

        socket.on('schedule.count',  (data) => {
            console.log(data);
        })
        socket.on('schedule.trigger',  (data) => {
            console.log('schedule.trigger from socket', data);
            actions.setVideo(data.job.video)
        })
    }

    onSelectVideoHandler(videoData){
        console.log('onSelectVideoHandler', videoData);
        const {actions} = this.props
        actions.setVideo(videoData)
    }

    onSelectJobHandler(jobData){
        console.log('onSelectJobHandler', jobData);
        const {actions} = this.props
        actions.setJob(jobData)
    }

    onSelectScheduleHandler(schedule){
        const {selectedJob, actions} = this.props
        const newSchedule = {
            cron : schedule
        }
        actions.updateJob(selectedJob.id, newSchedule)

    }


    onUpdateScheduleHandler(schedule){
        const {selectedVideo, actions} = this.props
        const newSchedule = {
            cron : schedule,
            video : selectedVideo
        }
        actions.createJob(newSchedule, ()=> {
            socket.emit('schedule.created')
        })
        actions.unsetVideo()

    }

    render() {
        const {isFetchingVideos, isFetchingJobs, videos, jobs, selectedVideo, selectedJob, actions} = this.props
        console.log('App selected job', selectedJob)
        return (
            <div className='App'>
                <header>
                    <h1>Schedule me Youtube</h1>
                </header>
                <main>
                    <section className="flex">
                        <div>
                            <Jobs data={jobs} selectedJob={selectedJob} isFetching={isFetchingJobs} onSelectJob={this.onSelectJobHandler} onDeleteSchedule={actions.deleteJobByVideoId} />
                        </div>
                        <div>
                            <Player selectedVideo={selectedVideo} selectedJob={selectedJob} setIsPlaying={actions.setIsPlaying} selectScheduleHandler={this.onSelectScheduleHandler}/>
                            <Scheduler onSchedule={this.onSelectScheduleHandler} onUpdate={this.onSelectScheduleHandler} selectedJob={selectedJob} selectedVideo={selectedVideo} />
                        </div>
                        <div>
                            <Search handleSearch={actions.search} isFetching={isFetchingVideos}/>
                            <SearchContainer data={videos} onSelectVideo={this.onSelectVideoHandler}/>
                        </div>
                    </section>
                </main>
            </div>
        )
    }
}
