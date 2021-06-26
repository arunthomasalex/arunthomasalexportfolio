'use strict';

import portfolioConstant from "./portfolio.constant";

export function fetchPortfolio() {
    const request = () => {
        return { type: portfolioConstant.REQUEST_PORTFOLIO }
    };
    const success = (portfolio) => {
        return { type: portfolioConstant.SUCCESS_PORTFOLIO, portfolio };
    };
    const error = (error) => {
        return { type: portfolioConstant.ERORR_PORTFOLIO, error };
    };
    return (dispatch) => {
        dispatch(request());
        fetch('/public/portfolio.json')
            .then(response => response.json())
            .then(portfolio => dispatch(success(portfolio)))
            .catch(err => dispatch(error(err)));
    }
}
