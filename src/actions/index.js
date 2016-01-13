import {actionTypes, youtube} from '../constants/'
import axios from 'axios'

function youtubeRequest() {
    return {
        type: actionTypes.SEARCH_RESULTS_REQUEST
    }
}

function youtubeSuccess(data) {
    return {
        type: actionTypes.SEARCH_RESULTS_SUCCESS,
        data
    }
}

function youtubeFailure() {
    return {
        type: actionTypes.SEARCH_RESULTS_FAILURE
    }
}


export function search(query) {
    return (dispatch, getState) => {
        dispatch(youtubeRequest())
        return axios.get(youtube.API_URL + query).then((response) => {
                dispatch(youtubeSuccess(response.data))
            })
            .catch((response) => {
                dispatch(youtubeFailure(response))
            })
    }
}


