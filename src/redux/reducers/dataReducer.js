import {SET_SCREAMS, LOADING_DATA, LIKE_SCREAM, UNLIKE_SCREAM, DELETE_SCREAM, POST_SCREAM, SET_SCREAM, SUBMIT_COMMENT, CLEAR_ERRORS} from '../types'

const initialState = {
    screams: [],
    scream: {},
    loading: false
}

export default function(state = initialState, action){
    let index
    switch(action.type){
        case LOADING_DATA:
            return {
                ...state,
                loading: true
            }
        case SET_SCREAMS:
            return{
                ...state,
                screams: action.payload,
                loading: false
            }
        case SET_SCREAM:
            return{
                ...state,
                scream: action.payload,
                loading: false
            }
        case LIKE_SCREAM: // in both cases do the same      
        case UNLIKE_SCREAM:
            index = state.screams.findIndex((scream) => scream.screamId === action.payload.screamId) // scream in brackets is individual state scream in array that will be compared with action payload 
            //we find index of the scream in the screams array and use that index to substitute the fetched data from the server to the value in the screams data
            state.screams[index] = action.payload
            if(state.scream.screamId === action.payload.screamId){
                const comments = state.scream.comments
                state.scream = action.payload
                state.scream.comments = comments
            }

            return {

                ...state
            }

        case DELETE_SCREAM:
            //we need to find the index of the scream that was deleted. the screamID of the scream deleted has been passed in the action payload
            index = state.screams.findIndex(scream => scream.screamId === action.payload)
            state.screams.splice(index, 1) /// remove the deleted scream from the screams array in the state
            return {
                ...state
            }
        case POST_SCREAM:
            return {
                ...state,
                screams: [
                    action.payload,
                    ...state.screams
                ]
            }
            
        case SUBMIT_COMMENT:
          // console.log(action.payload)
            return {
                ...state,
                scream: {
                    ...state.scream,
                    comments: [action.payload, ...state.scream.comments]
                }
            }
        
        
        default:
           return state    
    }
}