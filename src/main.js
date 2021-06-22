'use strict';

import React from 'react';
import { hydrate } from 'react-dom';
import { Provider } from 'react-redux'
import { store as configureState } from './redux';
import App from './components/app';

const state = window.__STATE__;
delete window.__STATE__;

const store = configureState(state);

hydrate(<Provider store={store}><App/></Provider>, document.querySelector('#app'))