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
import { storageActions, getAllState } from '../store/Store.js';
const Header = (props) =>
{
  let storeData = getAllState();
  return (  <Grid.Column width={3}>
    <Menu fluid vertical tabular>
    <Link to="/home" onClick={() => storageActions.setActiveItem("home")}>
      <Menu.Item
        name='home'
        active={storeData.activeItem === 'home'}
      />
    </Link>
    <Link to="/class" onClick={() => storageActions.setActiveItem("class")}>
      <Menu.Item
        name='kelas'
        active={storeData.activeItem === 'class'}
      />
    </Link>
    <Link to="/student" onClick={() => storageActions.setActiveItem("student")}>
      <Menu.Item
        name='siswa'
        active={storeData.activeItem === 'student'}
      />
    </Link>
    <Link to="/teacher" onClick={() => storageActions.setActiveItem("teacher")}>
      <Menu.Item
        name='guru'
        active={storeData.activeItem === 'teacher'}
      />
    </Link>
    <Link to="/subject" onClick={() => storageActions.setActiveItem("subject")}>
      <Menu.Item
        name='mata pelajaran'
        active={storeData.activeItem === 'subject'}
      />
    </Link>
    <Link to="/users" onClick={() => storageActions.setActiveItem("users")}>
      <Menu.Item
        name='users'
        active={storeData.activeItem === 'users'}
      />
    </Link>
    </Menu>
  </Grid.Column>)};

export default Header;
