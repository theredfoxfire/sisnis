import React, { Component } from 'react'
import {
  Grid,
} from 'semantic-ui-react'
import Header from '../uikit/Header'
import Menus from '../uikit/Menus'

export default class MenuExampleTabularOnLeft extends Component {


  render() {
    return (
      <div>
      <Header />
      <Grid style={{ marginTop: '2.4em' }}>
        <Menus />
        <Grid.Column stretched width={12}>
          <h1>About</h1>
        </Grid.Column>
      </Grid>
      </div>
    )
  }

}
