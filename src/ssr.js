'use strict';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { store as configureStore } from './redux';
import App from '../server/App';

module.exports = function render(state) {
    const store = configureStore(state);
    const content = renderToString(<Provider store={store}><App/></Provider>);
    const preloadedState = store.getState()
    return { content, state: preloadedState };
}
