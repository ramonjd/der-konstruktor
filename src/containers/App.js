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

function mapStateToProps(state) {
    const { search, jobs } = state

    return {
        jobs : jobs.results,
        isFetchingJobs : jobs.isFetching,
        videos : search.results,
        isFetchingVideos : search.isFetching
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
        isFetchingJobs:  PropTypes.bool,
        isFetchingVideos:  PropTypes.bool,
        actions : PropTypes.objectOf(React.PropTypes.func).isRequired
    };

    constructor(props) {
        super(props)
    }

    componentWillMount() {
        this.props.actions.getJobs()
    }

    render() {
        const {isFetchingVideos, isFetchingJobs, videos, jobs, actions} = this.props
        console.log('App : jobs', jobs)
        console.log('App : videos', videos)
        console.log('App : isFetchingVideos', isFetchingVideos)
        console.log('App : isFetchingJobs', isFetchingJobs)

        return (
            <div className='App'>
                <header>
                    <h1>App</h1>
                </header>
                <main>
                    <section>
                        <p>Current Crons</p>
                        <Jobs data={jobs} isFetching={isFetchingJobs} />
                        <Player videoId={} />
                        <Search handleSearch={actions.search} isFetching={isFetchingVideos}/>
                        <SearchContainer data={videos}/>
                    </section>
                </main>
            </div>
        )
    }
}
