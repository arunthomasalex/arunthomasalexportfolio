'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { portfolioEventNames, portfolioEvents } from '../../../events';
import { PortfolioContext } from '../../../helpers';
import { portfolioAction, portfolioConstant } from '../../redux';
import { Home } from '../home';
import { About } from '../about';
import { Contact } from '../contact';

class Layout extends Component {
    constructor(props) {
        super(props);
        this.state = { isCient: false, portfolio: void 0 };
    }
    componentDidMount() {
        this.setState({ ...this.state, isClient: true });
        portfolioEvents.addOnceEvent(
            portfolioEventNames.ON_SUCCESS,
            portfolioConstant.SUCCESS_PORTFOLIO,
            ({ portfolio }) => this.setState({ ...this.state, portfolio })
        );
        this.props.fetchPortfolio();
    }
    componentWillUnmount() {
        portfolioEvents.off(portfolioEventNames.ON_SUCCESS);
    }
    render() {
        const { isClient } = this.state;
        return (
            <PortfolioContext.Provider value={this.state}>
                <Home />
                <About />
                {isClient && <Contact />}
            </PortfolioContext.Provider>
        );
    }
}

function mapStateToProps() {
    return {}
}
const actions = {
    fetchPortfolio: portfolioAction.fetchPortfolio
}
export default connect(mapStateToProps, actions)(Layout);