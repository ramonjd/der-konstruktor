import {actionTypes} from '../constants/'

export function get(data) {
    return {
        type: actionTypes.GET_CONFIGS,
        data
    }
}

export function add(data) {
    return {
        type: actionTypes.ADD_CONFIG,
        data
    }
}

export function del(id) {
    return {
        type: actionTypes.DELETE_CONFIG,
        id
    }
}


export function getConfigs() {
    return (dispatch, getState) => {
        // get all configs here
        dispatch(get({}))
    }
}


export function addConfig(data) {
    return (dispatch, getState) => {
        // add config here
        dispatch(add({}))
    }
}

export function deleteConfig(id) {
    return (dispatch, getState) => {
        // delete config here
        dispatch(del({}))
    }
}