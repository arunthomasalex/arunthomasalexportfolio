'use strict';

import portfolioConstant from "./portfolio.constant";
import { portfolioEvents } from '../events';

export function portfolioReducer(state = {}, action) {
    portfolioEvents.trigger(action.type, action);
    switch (action.type) {
        case portfolioConstant.REQUEST_PORTFOLIO:
            return { ...state, portfolio: void 0 };
        case portfolioConstant.SUCCESS_PORTFOLIO:
            const { portfolio } = action;
            return { ...state, portfolio };
        case portfolioConstant.ERORR_PORTFOLIO:
            const { error } = action;
            return { error };
        default:
            return state
    }
}
