import React, { Component } from 'react';
import { connect } from 'react-redux';
import { portfolioAction, portfolioConstant } from '../redux';
import { portfolioEvents, portfolioEventNames } from '../events';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { portfolio: void 0 };
    portfolioEvents.addOnceEvent(
      portfolioEventNames.ON_SUCCESS,
      portfolioConstant.SUCCESS_PORTFOLIO,
      ({ portfolio }) => this.setState({ portfolio })
    );
  }
  componentDidMount() {
    this.props.fetchPortfolio();
  }
  componentWillUnmount() {
    portfolioEvents.off(portfolioEventNames.ON_SUCCESS);
  }
  render() {
    console.log(portfolioEvents);
    const { portfolio } = this.state;
    return (
      <div>
        Hello World from App.{JSON.stringify(portfolio)}
      </div>
    );
  }
}

function mapStateToProps() {
  return {}
}
const actions = {
  fetchPortfolio: portfolioAction.fetchPortfolio
}
export default connect(mapStateToProps, actions)(App);
