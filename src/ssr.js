'use strict';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { portfolioStore as configurePortfolioStore } from './portfolio/redux';
import PortfolioApp from '../server/PortfolioApp';
import ResumeApp from '../server/ResumeApp';

export function renderPortfolio(state) {
    const store = configurePortfolioStore(state);
    const content = renderToString(<Provider store={store}><PortfolioApp/></Provider>);
    const preloadedState = store.getState()
    return { content, state: preloadedState };
}

export function renderResume(state) {
    const store = configurePortfolioStore(state);
    const content = renderToString(<Provider store={store}><ResumeApp/></Provider>);
    const preloadedState = store.getState()
    return { content, state: preloadedState };
}