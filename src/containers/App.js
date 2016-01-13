if (process.env.BROWSER) {
    require('../scss/App.scss')
}
import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actions  from '../actions/'
import Search from '../components/Search'
import SearchContainer from '../components/SearchContainer'

function mapStateToProps(state) {
    const { search } = state

    return {
        results : search.results,
        isFetching : search.isFetching
    }
}

function mapDispatchToProps(dispatch) {
    return { actions : bindActionCreators(actions, dispatch) }
}


@connect(mapStateToProps, mapDispatchToProps)
export default class App extends Component {

    static propTypes = {
        results:  PropTypes.object.isRequired,
        isFetching:  PropTypes.bool,
        actions : PropTypes.objectOf(React.PropTypes.func).isRequired
    };

    constructor(props) {
        super(props)
        this.searchYouTube = this.searchYouTube.bind(this)
    }

    componentWillMount() {
    }

    searchYouTube(q) {
        const {actions} = this.props
        actions.search(q)
    }

    render() {
        const {isFetching, results} = this.props
        console.log('App : results', results)
        console.log('App : isFetching', isFetching)
        return (
            <div className='App'>
                <header>
                    <h1>App</h1>
                </header>
                <main>
                    <section>
                        <Search handleSearch={this.searchYouTube} isFetching={isFetching}/>
                        <SearchContainer data={results}/>
                    </section>
                </main>
            </div>
        )
    }
}
