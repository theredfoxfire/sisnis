import React, { Component } from 'react'
import {
  Container,
  Divider,
  Dropdown,
  Grid,
  Image,
  List,
  Menu,
  Segment,
} from 'semantic-ui-react'
import {
  Link
} from "react-router-dom";
import { storeActions, getAllState } from '../store/Store.js';
const Header = (props) =>
{
  let {activeItem} = getAllState();
  return (  <Grid.Column width={3}>
    <Menu fluid vertical tabular>
    <Link to="/home" onClick={() => storeActions.setActiveItem("home")}>
      <Menu.Item
        name='home'
        active={activeItem === 'home'}
      />
    </Link>
    <Link to="/class" onClick={() => storeActions.setActiveItem("class")}>
      <Menu.Item
        name='kelas'
        active={activeItem === 'class'}
      />
    </Link>
    <Link to="/student" onClick={() => storeActions.setActiveItem("student")}>
      <Menu.Item
        name='siswa'
        active={activeItem === 'student'}
      />
    </Link>
    <Link to="/teacher" onClick={() => storeActions.setActiveItem("teacher")}>
      <Menu.Item
        name='guru'
        active={activeItem === 'teacher'}
      />
    </Link>
    <Link to="/subject" onClick={() => storeActions.setActiveItem("subject")}>
      <Menu.Item
        name='mata pelajaran'
        active={activeItem === 'subject'}
      />
    </Link>
    <Link to="/users" onClick={() => storeActions.setActiveItem("users")}>
      <Menu.Item
        name='users'
        active={activeItem === 'users'}
      />
    </Link>
    </Menu>
  </Grid.Column>)};

export default Header;
