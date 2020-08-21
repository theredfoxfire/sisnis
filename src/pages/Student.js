import React, { Component } from 'react'
import {
  Container,
  Grid,
  Segment,
  Form,
  Button,
  Table,
  Icon,
} from 'semantic-ui-react'
import Header from '../uikit/Header'
import Menus from '../uikit/Menus'
import {
  Link
} from "react-router-dom";

export default class Student extends Component {
  render() {
    return (
      <div>
      <Header />
      <Grid style={{ marginTop: '2.4em' }}>
        <Menus />
        <Grid.Column stretched width={12}>
        <h1>Tabel Siswa</h1>
        <Link to="/student-form">
          <Button color='green' size="small">
          <Icon name='plus' />
          Tambah Siswa
        </Button>
        </Link>
        <Table celled selectable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>No</Table.HeaderCell>
              <Table.HeaderCell>No. Induk</Table.HeaderCell>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Actions</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            <Table.Row>
              <Table.Cell>1</Table.Cell>
              <Table.Cell width="3">NIS123456</Table.Cell>
              <Table.Cell width="6">Jaka Sembung</Table.Cell>
              <Table.Cell>
              <Link to="/student-form">
              <Button color='green' basic>
                <Icon name='pencil' />
                Edit
              </Button>
              </Link>
              <Button color='red' basic>
                <Icon name='trash' />
                Hapus
              </Button>
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>2</Table.Cell>
                <Table.Cell width="3">NIS123456</Table.Cell>
                <Table.Cell width="6">Jaka Sembung</Table.Cell>
              <Table.Cell>
              <Link to="/student-form">
              <Button color='green' basic>
                <Icon name='pencil' />
                Edit
              </Button>
              </Link>
              <Button color='red' basic>
                <Icon name='trash' />
                Hapus
              </Button>
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>3</Table.Cell>
                <Table.Cell width="3">NIS123456</Table.Cell>
                <Table.Cell width="6">Jaka Sembung</Table.Cell>
              <Table.Cell>
              <Link to="/student-form">
              <Button color='green' basic>
                <Icon name='pencil' />
                Edit
              </Button>
              </Link>
              <Button color='red' basic>
                <Icon name='trash' />
                Hapus
              </Button>
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
        </Grid.Column>
      </Grid>
      </div>
    )
  }

}
