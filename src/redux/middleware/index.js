import thunk from 'redux-thunk'
import logging from './logging'
import { applyMiddleware } from 'redux'


export default applyMiddleware(
    thunk,
    logging
)