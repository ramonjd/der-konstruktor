import { combineReducers } from 'redux'
import search from './search'
import jobs from './jobs'
import player from './player'

const rootReducer = combineReducers({
    search,
    jobs,
    player
})

export default rootReducer