import React, { Component } from 'react'
import {
  Grid,
} from 'semantic-ui-react';

export default class Home extends Component {
  render() {
    return (
      <div>
        <Grid.Column stretched width={12}>
          <h1>Home</h1>
        </Grid.Column>
      </div>
    )
  }

}
