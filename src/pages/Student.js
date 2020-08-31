import React, { Component } from 'react'
import {
  Grid,
  Button,
  Table,
  Icon,
  Header, Modal,
} from 'semantic-ui-react'
import HeaderMenu from '../uikit/Header';
import Menus from '../uikit/Menus';
import Loader from '../uikit/Loader';
import {
  Link
} from "react-router-dom";
import { getAllState, storeActions } from '../store/Store.js';
import {getStudentList, deleteStudent} from './api-data/student';

const initialState = {
  selectedStudent: {
    serial: '',
    name: '',
  },
};

export default class Student extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
      selectedID: 0,
    }
  }
  render() {
    let {studentList} = getAllState();
    let {isModalOpen} = this.state;
    return (
      <div>
      <HeaderMenu />
      <Grid style={{ marginTop: '2.4em' }}>
        <Menus />
        <Grid.Column stretched width={12}>
        <h1>Tabel Siswa</h1>
      <Link to="/student-form/0" onClick={() => storeActions.setSelectedStudent(initialState.selectedStudent)}>
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
            {studentList.map((item, key) => {
              return (
                <Table.Row key={key}>
                  <Table.Cell>{key + 1}</Table.Cell>
                <Table.Cell width="3">{item.serial}</Table.Cell>
              <Table.Cell width="6">{item.name}</Table.Cell>
                  <Table.Cell>
                  <Link to={`/student-form/${item.id}`}>
                  <Button color='green' basic onClick={() => {
                      storeActions.setSelectedStudent(initialState.selectedStudent);
                    }}>
                    <Icon name='pencil' />
                    Edit
                  </Button>
                  </Link>
                  <Button color='red' basic onClick={() => this.setState({isModalOpen: true, selectedID: item.id})}>
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
      <Modal
        closeIcon
        open={isModalOpen}
        onClose={() => this.setState({isModalOpen: false})}
        onOpen={() => this.setState({isModalOpen: true})}
      >
      <Header icon='trash' content='Hapus Data Siswa' />
      <Modal.Content>
        <p>
          Apakah Anda yakin ingin menghapus data ini?
        </p>
      </Modal.Content>
      <Modal.Actions>
        <Button color='red' onClick={() => this.setState({isModalOpen: false})}>
          <Icon name='remove' /> Tidak
        </Button>
        <Button color='green' onClick={() => this._onDeleteItem()}>
          <Icon name='checkmark' /> Ya
        </Button>
      </Modal.Actions>
    </Modal>
      </div>
    )
  }

  componentDidMount() {
    storeActions.setIsLoading(true);
    storeActions.setIsError(false);
    getStudentList();
  }

  _onDeleteItem = () => {
    let {selectedID} = this.state;
    this.setState({isModalOpen: false});
    storeActions.setIsLoading(true);
    deleteStudent(selectedID);
  }
}
