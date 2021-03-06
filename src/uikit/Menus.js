import React from 'react';
import {
  Grid,
  Menu,
} from 'semantic-ui-react'
import {
  Link
} from "react-router-dom";
import { storeActions, getAllState } from '../store/Store.js';
import { USER_ROLE } from '../Constants';
import { getUserRole } from '../utils/arrayUtils';
const Header = (props) => {
  let { activeItem, userDetail } = getAllState();
  return (<Grid.Column width={3}>
    <Menu fluid vertical tabular>

    </Menu>
  </Grid.Column>)
};

export default Header;
