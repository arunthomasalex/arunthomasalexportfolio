'use strict';

import { EventEmitter } from "eventemitter3";

class PortfolioEvents extends EventEmitter {
    onActionEvents = {}
    onceActionEvents = {}
    #addToOnActionObject(action, name) {
        if(!this.onActionEvents[action]) {
            this.onActionEvents[action] = []  
        }
        this.onActionEvents[action].push(name)
    }
    #addToOnceActionEvents(action, name) {
        if(!this.onceActionEvents[action]) {
            this.onceActionEvents[action] = []  
        }
        this.onceActionEvents[action].push(name)
    }
    addOnEvent(name, action, fn) {
        this.#addToOnActionObject(action, name);
        this.on(name, fn);
    }
    addOnceEvent(name, action, fn) {
        this.#addToOnceActionEvents(action, name);
        this.once(name, fn);
    }
    trigger(action, payload) {
        this.onActionEvents[action]?.forEach(event => this.emit(event, payload));
        this.onceActionEvents[action]?.forEach(event => this.emit(event, payload));
        delete this.onceActionEvents[action];
    }
}

const portfolioEvents = new PortfolioEvents();
const portfolioEventNames = {
    ON_SUCCESS: 'ON_SUCCESS'
}

export { portfolioEvents, portfolioEventNames };