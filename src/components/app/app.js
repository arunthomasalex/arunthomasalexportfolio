import React, { Component } from 'react';
import { Route, MemoryRouter as Router, Switch } from 'react-router';
import Layout from './layout';
import Header from './header';
import NavBar from './navbar';
import './style.scss';
import './header.scss';
import './navbar.scss';

function FadeEffect(props) {
  return (
    <div ref={props.fader} className="fade-out-effect"></div>
  );
}

function PreLoader() {
  return (
    <div className="preloader">
      <div className="box">
        <div></div><div></div><div></div>
      </div>
    </div>
  );
}

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isClient: false
    }
    this.menu = React.createRef();
    this.fade = React.createRef();
  }

  componentDidMount() {
    this.setState({isClient: true})
  }

  render() {
    const { isClient } = this.state;
    return (
      <React.StrictMode>
        <Router>
          <PreLoader />
          {isClient && <Header refValue={this.menu} />}
          {isClient && <NavBar refValue={this.menu} fader={this.fade} />}
          <FadeEffect fader={this.fade} />
          <Switch>
            <Route exact path="/" component={Layout} />
          </Switch>
        </Router>
      </React.StrictMode>
    );
  }
}
