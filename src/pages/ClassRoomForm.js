import React, { Component } from 'react'
import {
  Container,
  Grid,
  Segment,
  Form,
  Button,
} from 'semantic-ui-react'
import Header from '../uikit/Header'
import Menus from '../uikit/Menus'
import {
  Link
} from "react-router-dom";

export default class ClassRoomForm extends Component {
  render() {
    return (
      <div>
      <Header />
      <Grid style={{ marginTop: '2.4em' }}>
        <Menus />
        <Grid.Column stretched width={12}>
        <h1>Form Kelas</h1>
        <Form size='large'>
          <Segment stacked>
            <h4>Nama kelas:</h4>
            <Form.Input fluid placeholder='Nama Kelas' />
            <Link to="/class">
            <Button color='teal' size='small'>
               Simpan
            </Button>
          </Link>
          </Segment>
        </Form>
        </Grid.Column>
      </Grid>
      </div>
    )
  }

}
