import React, { Component } from 'react'
import {
  Grid,
  Button,
  Table,
  Icon,
  Header, Modal,
} from 'semantic-ui-react';
import {
  Link
} from "react-router-dom";
import { getAllState, storeActions } from '../store/Store.js';
import {getTeacherList, deleteTeacher} from './api-data/teacher';
import initialState from '../store/state.js';

export default class Teacher extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
      selectedID: 0,
    }
  }
  render() {
    let {teacherList} = getAllState();
    let {isModalOpen} = this.state;
    return (
      <div>
        <Grid.Column stretched width={12}>
        <h1>Tabel Guru</h1>
      <Link to="/teacher-form/0" onClick={() => storeActions.setSelectedTeacher(initialState.selectedTeacher)}>
          <Button color='green' size="small">
          <Icon name='plus' />
          Tambah Guru
        </Button>
        </Link>
        <Table celled selectable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>No</Table.HeaderCell>
              <Table.HeaderCell>No. Induk</Table.HeaderCell>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Walikelas</Table.HeaderCell>
              <Table.HeaderCell>Actions</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {teacherList.map((item, key) => {
              return (
                <Table.Row key={key}>
                  <Table.Cell>{key + 1}</Table.Cell>
                <Table.Cell width="3">{item.serial}</Table.Cell>
              <Table.Cell width="6"><Link to={`/teacher-detail/${item.id}`}>{item.name}</Link></Table.Cell>
              <Table.Cell>{item.guardianClass.map((classRoom, i) => {
                return `${classRoom.name}; `;
              })}</Table.Cell>
                  <Table.Cell>
                  <Link to={`/teacher-form/${item.id}`}>
                  <Button color='green' basic onClick={() => {
                      storeActions.setSelectedTeacher(initialState.selectedTeacher);
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
        </Grid.Column>
      <Modal
        closeIcon
        open={isModalOpen}
        onClose={() => this.setState({isModalOpen: false})}
        onOpen={() => this.setState({isModalOpen: true})}
      >
      <Header icon='trash' content='Hapus Data Guru' />
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
    getTeacherList();
  }

  _onDeleteItem = () => {
    let {selectedID} = this.state;
    this.setState({isModalOpen: false});
    storeActions.setIsLoading(true);
    deleteTeacher(selectedID);
  }
}
