import {createStore, combineReducers, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import userReducer from './reducers/userReducer'
import uiReducer from './reducers/uiReducer'
import dataReducer from './reducers/dataReducer'


const initialState = {}

const middleware = [thunk]

const reducers = combineReducers({
    user: userReducer,
    data: dataReducer,
    UI: uiReducer
})

//const enhancer = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
const enhancer = window.__REDUX_DEVTOOLS_EXTENSION__
        ? window.__REDUX_DEVTOOLS_EXTENSION__()
        : f => f

const store = createStore(reducers, initialState, compose(applyMiddleware(...middleware), enhancer))


export default store
