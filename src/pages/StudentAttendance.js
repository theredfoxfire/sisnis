import React, { Component } from 'react'
import {
  Grid,
  Button,
  Table,
  Icon,
} from 'semantic-ui-react';
import {
  Link
} from "react-router-dom";
import { getAllState, storeActions, chainToView } from '../store/Store.js';
import {getStudentAttendanceList, deleteStudentAttendance} from './api-data/studentAttendance';
import initialState from '../store/state.js';

class StudentAttendance extends Component {
  render() {
    let {studentAttendanceList} = getAllState();
    return (
      <div>
        <Grid.Column stretched width={12}>
        <h1>Tabel Daftar Hadir Siswa</h1>
        <Link to="/studentAttendance-form/0">
          <Button color='green' size="small" onClick={() => storeActions.setSelectedStudentAttendance(initialState.selectedStudentAttendance)}>
            <Icon name='plus' />
            Tambah
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
            {studentAttendanceList.map((item, key) => {
              return (
                <Table.Row key={key}>
                  <Table.Cell>{key + 1}</Table.Cell>
              <Table.Cell width="6">{item.time}</Table.Cell>
                  <Table.Cell>
                  <Link to={`/studentAttendance-form/${item.id}`}>
                  <Button color='green' basic onClick={() => storeActions.setSelectedStudentAttendance(initialState.selectedStudentAttendance)}>
                    <Icon name='pencil' />
                    Edit
                  </Button>
                  </Link>
                  <Button color='red' basic onClick={() => this._handleDelete(item.id)}>
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
      </div>
    )
  }

  componentDidMount() {
    storeActions.setIsLoading(true);
    storeActions.setIsError(false);
    getStudentAttendanceList();
  }

  _handleDelete = (id) => {
    let { isError } = getAllState();
    storeActions.setIsLoading(true);
    storeActions.setModalStatus(true);
    storeActions.setDialogTitle("Hapus Data");
    storeActions.setDialogMessage("Anda yakin akan menghapus item ini?");
    storeActions.setModalConfirmAction(() => {
      storeActions.setModalStatus(false);
      deleteStudentAttendance(id).then(() => {
        isError && storeActions.setIsError(false);
      });
    });
  }
}

export default chainToView(StudentAttendance);
