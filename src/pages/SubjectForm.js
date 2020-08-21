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

export default class SubjectForm extends Component {
  render() {
    return (
      <div>
      <Header />
      <Grid style={{ marginTop: '2.4em' }}>
        <Menus />
        <Grid.Column stretched width={12}>
        <h1>Form Mata Pelajaran</h1>
        <Form size='large'>
          <Segment stacked>
            <h4>Kode Mata Pelajaran:</h4>
            <Form.Input fluid placeholder='Kode Mata Pelajaran' />
            <h4>Nama Mata Pelajaran:</h4>
            <Form.Input fluid placeholder='Nama Mata Pelajaran' />
            <Link to="/subject">
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
