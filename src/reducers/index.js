import { combineReducers } from 'redux'
import search from './search'
import jobs from './jobs'

const rootReducer = combineReducers({
    search,
    jobs
})

export default rootReducer