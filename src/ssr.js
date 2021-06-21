'use strict';
import React from 'react';
import { renderToString } from 'react-dom/server';
import App from './components/app';


module.exports = function render(initialState) {

    // render the App static markup ins content variable
    const content = renderToString(<App/>);
    return content;
}
