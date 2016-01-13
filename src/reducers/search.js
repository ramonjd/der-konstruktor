import {actionTypes} from '../constants/'


const initialState = {
    isFetching: false,
    results : {}
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
        default:
            return state
    }
}