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
// import styled from 'styled-components'
// const StyledLink = styled(Link)`
//   color: palevioletred;
//   font-weight: bold;
// `;

export default class MenuExampleTabularOnLeft extends Component {


  render() {
    let {activeItem, handleItemClick} = this.props;
    return (
      <div>
      <Header />
      <Grid style={{ marginTop: '2.4em' }}>
        <Menus />
        <Grid.Column stretched width={12}>
          About
        </Grid.Column>
      </Grid>
      </div>
    )
  }

}
