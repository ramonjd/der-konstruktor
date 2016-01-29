if (process.env.BROWSER) {
    require('../scss/Search.scss')
}


import React, { Component, PropTypes } from 'react'
import axios from 'axios'
import SearchContainer from './SearchContainer'
import Button from './Button'
import { search } from '../actions/'

let getInitialState = () => {
    return {
        query: ''
    }
}

export default class Search extends Component {
    static propTypes = {};

    constructor(props) {
        super(props)
        this.state = getInitialState()
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }


    handleSubmit(e) {
        e.preventDefault()
        let { handleSearch } = this.props
        handleSearch(this.state.query)
    }

    handleInputChange(e) {
        this.setState({query: e.target.value})
    }

    render() {
        const { isFetching } = this.props
        return (
            <div className='Search'>
                <h2>Search</h2>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor='query'>
                        <input id='query' type='text'
                               autofocus
                               disabled={isFetching}
                               placeholder='Search YouTube'
                               name='name'
                               onChange={this.handleInputChange}
                               value={this.state.query}/>
                    </label>
                    <Button type='submit' disabled={isFetching} className='submitForm'>Search</Button>
                </form>
            </div>
        )
    }

}