import {actionTypes} from '../constants/'
import find from 'lodash/find'


const initialState = {
    isFetchingSearchResults: false,
    searchResults : {}
}

export default function search(state = initialState, action = {}) {
    switch (action.type) {
        case actionTypes.SEARCH_RESULTS_REQUEST:
            return Object.assign({}, state, {
                isFetchingSearchResults: true
            })
        case actionTypes.SEARCH_RESULTS_SUCCESS:
            return Object.assign({}, state, {
                isFetchingSearchResults: false,
                searchResults : action.data
            })
        default:
            return state
    }
}