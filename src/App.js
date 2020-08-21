import React, {Component} from "react";
import { storeSetContainer, getAllState, storageActions } from './store/Store.js';
import Routes from './Routes';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {...getAllState()};
  }

  async componentDidMount() {
    let stateBag = getAllState();
    let currentPath = window.location.pathname.split('/')[1];
    let isSameAsPreviusScreen = stateBag.activeItem === currentPath;
    await storeSetContainer(this);
    if (!isSameAsPreviusScreen) {
      await storageActions.setActiveItem(currentPath);
    }
  }

  render() {
    return (
    <Routes />
  )}

  componentDidUpdate(prevProps, prevState) {
    if (JSON.stringify(prevState) !== JSON.stringify(this.state)) {
      storeSetContainer(this);
    }
  }
}
