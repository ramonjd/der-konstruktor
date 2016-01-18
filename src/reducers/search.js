import {actionTypes} from '../constants/'
import find from 'lodash/find'


const initialState = {
    isFetching: false,
    results : {},
    selected : {}
}

export default function search(state = initialState, action = {}) {
    switch (action.type) {
        case actionTypes.SEARCH_RESULTS_REQUEST:
            return Object.assign({}, state, {
                isFetching: true
            })
        case actionTypes.SEARCH_RESULTS_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                results : action.data
            })
        case actionTypes.SEARCH_RESULTS_SELECT:
            let selected = find(state.results.items, (o) => { return o.id.videoId === action.id })
            return Object.assign({}, state, {
                selected : selected
            })
        default:
            return state
    }
}