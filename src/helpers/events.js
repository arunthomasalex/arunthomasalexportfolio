'use strict';

import EventEmitter from 'eventemitter3';

const eventEmitter = new EventEmitter();
const emitter = Object.freeze({
    on: (event, fn) => eventEmitter.on(event, fn),
    once: (event, fn) => eventEmitter.once(event, fn),
    off: (event, fn) => eventEmitter.off(event, fn),
    emit: (event, payload) => eventEmitter.emit(event, payload)
});

export { emitter as eventEmitter };