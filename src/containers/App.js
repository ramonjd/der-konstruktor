if (process.env.BROWSER) {
    require('../scss/App.scss')
}
import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actions  from '../actions/'
import Button from '../components/Button'
import * as clientCommon from '../../node_modules/client-lib-js-common-skyid/'
import axios from 'axios'

function mapStateToProps(state) {
    const { config } = state
    return {
        config
    }
}

function mapDispatchToProps(dispatch) {
    return { actions : bindActionCreators(actions, dispatch) }
}


@connect(mapStateToProps, mapDispatchToProps)
export default class App extends Component {

    static propTypes = {
        config:  PropTypes.arrayOf(React.PropTypes.object).isRequired,
        actions : PropTypes.objectOf(React.PropTypes.func).isRequired
    };

    constructor(props) {
        super(props)
    }

    componentWillMount() {
        axios.get('{}').then((response)=>{

            console.log(response.data)
            var siren = response.data;
            console.log(clientCommon.buildRequestBody(siren.actions[0].fields, siren.entities[0].entities))
            console.log(clientCommon.getFormData(siren))

        })
    }




    render() {
        const {config, actions} = this.props
        console.log('App : config', config)
        return (
            <div className="App">
                <header role="banner">
                    <h1>App</h1>
                </header>
            <main>
                <section>
                    <Button>Button Component</Button>
                </section>
            </main>
            </div>
        )
    }
}
