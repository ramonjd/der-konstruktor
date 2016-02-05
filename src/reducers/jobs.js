import {actionTypes} from '../constants/'


const initialState = {
    isFetchingJobs: false,
    jobs : []
}

export default function jobs(state = initialState, action = {}) {
    switch (action.type) {
        case actionTypes.JOBS_REQUEST:
            return Object.assign({}, state, {
                isFetchingJobs: true
            })
        case actionTypes.JOBS_SUCCESS:
            return Object.assign({}, state, {
                isFetchingJobs: false,
                jobs : action.data
            })
        default:
            return state
    }
}