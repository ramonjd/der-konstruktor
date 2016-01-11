import Immutable from 'seamless-immutable'
import {actionTypes} from '../constants/'

const initialState = Immutable([])

export default function config(currentState = initialState, action = {}) {

    switch(action.type) {

        case actionTypes.GET_CONFIGS:
            return Immutable(action.data)

        case actionTypes.ADD_CONFIG:
            return Immutable([action.data].concat(currentState).sort())

        case actionTypes.DELETE_CONFIG:
            return Immutable(currentState.filter((obj) => {
                return action.id !== obj._id
            }))

        default:
            return currentState
    }
}