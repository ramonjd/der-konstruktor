import React from 'react'
import {render} from 'react-dom'
import { Provider } from 'react-redux'
import configureStore from './stores/appStore'
import App from './containers/App'

// just for now
const initialState =  {
    config : [{}],
    router : {}
}

const store = configureStore(initialState)

const ROOT_ELEM = document.getElementById('app')

render(
    <Provider store={store}>
        <App />
    </Provider>,  ROOT_ELEM
)