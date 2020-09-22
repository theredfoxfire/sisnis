import React, { Component } from 'react'
import {
  Grid,
  Button,
  Table,
  Icon,
} from 'semantic-ui-react';
import {getTeacherByID} from './api-data/teacher';
import {
  Link
} from "react-router-dom";
import { getAllState, storeActions } from '../store/Store.js';

export default class TeacherDetail extends Component {

  render() {
    let {selectedTeacher} = getAllState();
    let teacherID = this.props.match.params.id;
    return (
      <div>
        <Grid.Column stretched width={12}>
        <h1>Detail Guru: {selectedTeacher.name}</h1>

      <h3>Daftar Pelajaran untuk guru ini:</h3>
    <Link to={`/teacher-add-subject/${teacherID}`}>
          <Button color='green' size="small">
            <Icon name='plus' />
          Tambah Pelajaran Lagi
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

          {/* <Table.Body>
            {selectedTeacher.subjects.map((item, key) => {
              return (
                <Table.Row key={key}>
                  <Table.Cell>{key+1}</Table.Cell>
                  <Table.Cell width="9">{item.name}</Table.Cell>
                  <Table.Cell>
                  <Button color='red' basic onClick={() => this._handleDelete(item.id)}>
                    <Icon name='trash' />
                    Hapus
                  </Button>
                  </Table.Cell>
                </Table.Row>
              )
            })}
          </Table.Body> */}
        </Table>
        {/* {selectedTeacher.students.length < 1 && <h4>Data kosong.</h4> } */}
      </Grid.Column>
      </div>
    )
  }

  componentDidMount() {
    let teacherID = this.props.match.params.id;
    storeActions.setIsError(false);
    if (teacherID > 0) {
      getTeacherByID(teacherID);
      storeActions.setIsLoading(true);
    }
  }

  _handleDelete = (studentID) => {
    let teacherID = this.props.match.params.id;
    storeActions.setModalStatus(true);
    storeActions.setDialogTitle("Hapus data");
    storeActions.setDialogMessage("Anda yakin akan menghapus data ini?");
    // storeActions.setModalConfirmAction(() => {
    //   deleteStudentClass(studentID).then(() => {
    //     getTeacherByID(teacherID);
    //     storeActions.setModalStatus(false);
    //   });
    // });
  }
}
