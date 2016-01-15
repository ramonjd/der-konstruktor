import {actionTypes} from '../constants/'


const initialState = {
    isFetching: false,
    results : []
}

export default function jobs(state = initialState, action = {}) {
    switch (action.type) {
        case actionTypes.JOBS_REQUEST:
            return Object.assign({}, state, {
                isFetching: true
            })
        case actionTypes.JOBS_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                results : action.data
            })
        default:
            return state
    }
}