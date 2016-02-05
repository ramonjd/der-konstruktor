import {actionTypes} from '../constants/'

const initialState = {
    isPlayingVideo : false,
    selectedVideoJob : {}
}

export default function player(state = initialState, action = {}) {
    switch (action.type) {
        case actionTypes.PLAYER_IS_PLAYING:
            return Object.assign({}, state, {
                isPlayingVideo: action.isPlayingVideo
            })
        case actionTypes.PLAYER_UPDATE_VIDEO:
            return Object.assign({}, state, {
                selectedVideoJob : action.data
            })
        default:
            return state
    }
}