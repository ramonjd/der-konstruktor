import {actionTypes, youtube, api} from '../constants/'
import axios from 'axios'


// ========================================= YOUTUBE
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

function youtubeSelectVideo(state, id) {
    return {
        type: actionTypes.SEARCH_RESULTS_SELECT,
        state,
        id
    }
}

function youtubeClearSelectedVideo(state) {
    return {
        type: actionTypes.SEARCH_RESULTS_UNSELECT,
        state
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

export function selectVideo(videoId) {
    return (dispatch, getState) => {
        dispatch(youtubeSelectVideo(getState(), videoId))
    }
}

export function clearSelectedVideo(videoId) {
    return (dispatch, getState) => {
        dispatch(youtubeClearSelectedVideo(getState()))
    }
}

// ========================================= JOBS API


function jobRequest() {
    return {
        type: actionTypes.JOBS_REQUEST
    }
}

function jobSuccess(data) {
    return {
        type: actionTypes.JOBS_SUCCESS,
        data
    }
}

function jobFailure() {
    return {
        type: actionTypes.JOBS_FAILURE
    }
}


export function createJob(data, callback) {
    return (dispatch, getState) => {
        dispatch(jobRequest())
        return axios.post(api.JOBS_URL, data).then((response) => {
                dispatch(jobSuccess(response.data))
                if (callback) {
                    callback()
                }
            })
            .catch((response) => {
                dispatch(jobFailure(response))
            })
    }
}

export function updateJob(id, data) {
    return (dispatch, getState) => {
        dispatch(jobRequest())
        return axios.put(api.JOBS_URL, {id : id, data : data}).then((response) => {
                dispatch(jobSuccess(response.data))
            })
            .catch((response) => {
                dispatch(jobFailure(response))
            })
    }
}

export function getJobs() {
    return (dispatch, getState) => {
        dispatch(jobRequest())
        return axios.get(api.JOBS_URL).then((response) => {
                dispatch(jobSuccess(response.data))
            })
            .catch((response) => {
                dispatch(jobFailure(response))
            })
    }
}

export function deleteJobByVideoId(id) {
    return (dispatch, getState) => {
        dispatch(jobRequest())
        return axios.delete(api.JOBS_URL + '/' + id).then((response) => {
                dispatch(jobSuccess(response.data))
            })
            .catch((response) => {
                dispatch(jobFailure(response))
            })
    }
}


// ========================================= SCHEDULE API


function scheduleRequest() {
    return {
        type: actionTypes.SCHEDULE_REQUEST
    }
}

function scheduleSuccess(data) {
    return {
        type: actionTypes.SCHEDULE_SUCCESS,
        data
    }
}

function scheduleFailure() {
    return {
        type: actionTypes.SCHEDULE_FAILURE
    }
}

export function createSchedule(data) {
    return (dispatch, getState) => {
        dispatch(scheduleRequest())
        return axios.post(api.SCHEDULES_URL, data).then((response) => {
                dispatch(scheduleSuccess(response.data))
            })
            .catch((response) => {
                dispatch(scheduleFailure(response))
            })
    }
}

export function clearSchedule() {
    return (dispatch, getState) => {
        dispatch(scheduleRequest())
        return axios.post(api.SCHEDULES_URL, data).then((response) => {
                dispatch(scheduleSuccess(response.data))
            })
            .catch((response) => {
                dispatch(scheduleFailure(response))
            })
    }
}
