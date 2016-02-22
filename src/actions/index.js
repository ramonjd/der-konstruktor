import {actionTypes, youtube, api} from '../constants/'
import axios from 'axios'


// ========================================= PLAYER
function setPlayerVideo(data, isScheduled) {
    return {
        type: actionTypes.PLAYER_UPDATE_VIDEO,
        data,
        isScheduled
    }
}

function setPlayerIsPlaying(isPlayingVideo) {
    return {
        type: actionTypes.PLAYER_IS_PLAYING,
        isPlayingVideo
    }
}

export function setVideo(data, isScheduled = false) {
    return (dispatch) => {
        dispatch(setPlayerVideo(data, isScheduled))
    }
}

export function setIsPlaying(isPlayingVideo) {
    return (dispatch) => {
        dispatch(setPlayerIsPlaying(isPlayingVideo))
    }
}

export function unsetVideo() {
    return (dispatch) => {
        dispatch(setPlayerVideo({}, false))
    }
}

// ========================================= SEARCH
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
    return (dispatch) => {
        dispatch(youtubeRequest())
        return axios.get(youtube.API_URL + query).then((response) => {
            dispatch(youtubeSuccess(response.data))
        }).catch((response) => {
            dispatch(youtubeFailure(response))
        })
    }
}


// ========================================= JOBS


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
    return (dispatch) => {
        dispatch(jobRequest())
        return axios.post(api.JOBS_URL, data).then((response) => {
            dispatch(jobSuccess(response.data))
            if (callback) {
                callback()
            }
        }).catch((response) => {
            dispatch(jobFailure(response))
        })
    }
}

export function updateJob(id, data, callback) {
    return (dispatch) => {
        dispatch(jobRequest())
        return axios.put(api.JOBS_URL, {id: id, data: data}).then((response) => {
            dispatch(jobSuccess(response.data))
            if (callback) {
                callback()
            }
        }) .catch((response) => {
            dispatch(jobFailure(response))
        })
    }
}

export function getJobs(callback) {
    return (dispatch) => {
        dispatch(jobRequest())
        return axios.get(api.JOBS_URL).then((response) => {
            dispatch(jobSuccess(response.data))
            if (callback) {
                callback()
            }
        }).catch((response) => {
            dispatch(jobFailure(response))
        })
    }
}

export function deleteJobByVideoId(id) {
    return (dispatch) => {
        dispatch(jobRequest())
        return axios.delete(api.JOBS_URL + '/' + id, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            dispatch(jobSuccess(response.data))
        }).catch((response) => {
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
    return (dispatch) => {
        dispatch(scheduleRequest())
        return axios.post(api.SCHEDULES_URL, data).then((response) => {
            dispatch(scheduleSuccess(response.data))
        }).catch((response) => {
            dispatch(scheduleFailure(response))
        })
    }
}

export function clearSchedule() {
    return (dispatch) => {
        dispatch(scheduleRequest())
        return axios.post(api.SCHEDULES_URL, data).then((response) => {
            dispatch(scheduleSuccess(response.data))
        }).catch((response) => {
            dispatch(scheduleFailure(response))
        })
    }
}
