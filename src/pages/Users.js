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
import Header from '../uikit/Header'
import Menus from '../uikit/Menus'

export default class MenuExampleTabularOnLeft extends Component {


  render() {
    let {activeItem, handleItemClick} = this.props;
    return (
      <div>
      <Header />
      <Grid style={{ marginTop: '2.4em' }}>
        <Menus />
        <Grid.Column stretched width={12}>
          <h1>Users</h1>
        </Grid.Column>
      </Grid>
      </div>
    )
  }

}
