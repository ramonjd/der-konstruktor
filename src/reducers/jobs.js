import {actionTypes} from '../constants/'


const initialState = {
    isFetching: false,
    results : [],
    selectedJob : {}
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
        case actionTypes.JOBS_SELECT_JOB:
            console.log('JOBS_SELECT_JOB reducer', action)

            return Object.assign({}, state, {
                selectedJob : action.data
            })
        default:
            return state
    }
}