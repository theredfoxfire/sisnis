import React, { Component } from "react";
import { setStoreContainer, getAllState } from './store/Store.js';
import Routes from './Routes';

export default class App extends Component {
  constructor(props) {
    super(props);
    let initialState = getAllState();
    this.state = { ...initialState };
    setStoreContainer(this);
  }

  render() {
    return (
      <Routes />
    )
  }

  componentDidUpdate(prevState) {
    if (JSON.stringify(prevState) !== JSON.stringify(this.state)) {
      setStoreContainer(this);
    }
  }
}
