'use strict';

import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { portfolioReducer } from './portfolio.reducer';
// This line to be used if there are multiple reducers
// const rootReducers = combineReducers({portfolioReducer}); 

const loggerMiddleware = createLogger();

export function portfolioStore(preloadedState) {
    return createStore(
        portfolioReducer,
        preloadedState,
        applyMiddleware(thunkMiddleware, loggerMiddleware)
    );
}
