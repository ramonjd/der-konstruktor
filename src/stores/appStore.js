import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from '../reducers/'

export default function configureStore(initialState) {

    const createStoreWithMiddleware = compose(
        applyMiddleware(thunk)
    )(createStore)

    const store = createStoreWithMiddleware(rootReducer, initialState)

    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('../reducers/', () => {
            const nextRootReducer = require('../reducers/')
            store.replaceReducer(nextRootReducer)
        })
    }
    return store
}