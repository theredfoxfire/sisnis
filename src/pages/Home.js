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

export default class Home extends Component {
  render() {
    return (
      <div>
      <Header />
      <Grid style={{ marginTop: '2.4em' }}>
        <Menus />
        <Grid.Column stretched width={12}>
          <h1>Home</h1>
        </Grid.Column>
      </Grid>
      </div>
    )
  }

}
