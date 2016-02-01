import {actionTypes} from '../constants/'

const initialState = {
    isPlaying : false,
    video : {}
}

export default function player(state = initialState, action = {}) {
    switch (action.type) {
        case actionTypes.PLAYER_IS_PLAYING:
            return Object.assign({}, state, {
                isPlaying: action.isPlaying
            })
        case actionTypes.PLAYER_UPDATE_VIDEO:
            return Object.assign({}, state, {
                video : action.data
            })
        default:
            return state
    }
}