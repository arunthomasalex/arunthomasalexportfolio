'use strict';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { store as configureStore } from './redux';
import App from './components/app';

module.exports = function render(state) {
    const store = configureStore(state);
    // render the App static markup ins content variable
    const content = renderToString(<Provider store={store}><App/></Provider>);
    const preloadedState = store.getState()
    return { content, preloadedState };
}
