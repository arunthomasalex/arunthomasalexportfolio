'use strict';

import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { portfolioReducer } from './portfolio.reducer';
// This line to be used if there are multiple reducers
// const rootReducers = combineReducers({portfolio}); 

const loggerMiddleware = createLogger();

export function store(preloadedState) {
    return createStore(
        portfolioReducer,
        preloadedState,
        applyMiddleware(thunkMiddleware, loggerMiddleware)
    );
}
