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
import Loader from '../uikit/Loader'
import {getClassRoomList} from './api-data/classRoom'
import {
  Link
} from "react-router-dom";
import { getAllState, storeActions } from '../store/Store.js';

export default class ClassRoom extends Component {
  render() {
    let {classRoomList} = getAllState();
    return (
      <div>
      <Header />
      <Grid style={{ marginTop: '2.4em' }}>
        <Menus />
        <Grid.Column stretched width={12}>
        <h1>Tabel Kelas</h1>
        <Link to="/class-form">
          <Button color='green' size="small">
          <Icon name='plus' />
          Tambah Kelas
        </Button>
        </Link>
        <Table celled selectable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>No</Table.HeaderCell>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Actions</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {classRoomList.map((item, key) => {
              return (
                <Table.Row key={key}>
                  <Table.Cell>{key+1}</Table.Cell>
                  <Table.Cell width="9">{item.name}</Table.Cell>
                  <Table.Cell>
                  <Link to={`/class-form/${item.id}`}>
                  <Button color='green' basic onClick={() => storeActions.setSelectedClassRoomID(item.id)}>
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
              )
            })}
          </Table.Body>
        </Table>
        <Loader />
        </Grid.Column>
      </Grid>
      </div>
    )
  }

  componentDidMount() {
    storeActions.setIsLoading(true);
    storeActions.setIsError(false);
    getClassRoomList();
  }

}
