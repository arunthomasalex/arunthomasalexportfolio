'use strict';

import React from 'react';
import { hydrate } from 'react-dom';
import { Provider } from 'react-redux';
import { portfolioStore as configureState } from '../portfolio/redux';
import ResumeApp from './components/app';

const state = window.__STATE__;
delete window.__STATE__;

const store = configureState(state);
hydrate(<Provider store={store}><ResumeApp/></Provider>, document.querySelector('#app'));