import React, {Component} from "react";
import { setStoreContainer, getAllState, storeActions } from './store/Store.js';
import Routes from './Routes';

export default class App extends Component {
  constructor(props) {
    super(props);
    let initialState = getAllState();
    this.state = {...initialState};
    setStoreContainer(this);
  }

  async componentDidMount() {
    let stateBag = getAllState();
    let currentPath = window.location.pathname.split('/')[1];
    let isSameAsPreviusScreen = stateBag.activeItem === currentPath;
    if (!isSameAsPreviusScreen) {
      await storeActions.setActiveItem(currentPath);
    }
  }

  render() {
    return (
    <Routes />
  )}

  componentDidUpdate(prevProps, prevState) {
    if (JSON.stringify(prevState) !== JSON.stringify(this.state)) {
      setStoreContainer(this);
    }
  }
}
