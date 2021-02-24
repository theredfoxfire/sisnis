import React, { Component } from 'react'
import {
  Grid,
  Button,
  Table,
  Icon,
} from 'semantic-ui-react';
import { getTeacherByID, deleteTeacherClass } from './api-data/teacher';
import {
  Link
} from "react-router-dom";
import { getAllState, storeActions } from '../store/Store.js';

export default class TeacherDetail extends Component {

  render() {
    let { selectedTeacher } = getAllState();
    let teacherID = this.props.match.params.id;
    return (
      <div>
        <Grid.Column stretched width={12}>
          <h1>Detail Guru: {selectedTeacher.name}</h1>

          <h3>Walikelas: {selectedTeacher.guardianClass.map((classRoom, i) => {
            return `${classRoom.name}; `;
          })}</h3>
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
                <Table.HeaderCell>Nilai KKM</Table.HeaderCell>
                <Table.HeaderCell>Tahun Ajaran</Table.HeaderCell>
                <Table.HeaderCell>Actions</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {selectedTeacher.classToSubjects.map((item, key) => {
                return (
                  <Table.Row key={key}>
                    <Table.Cell>{key + 1}</Table.Cell>
                    <Table.Cell width="4">
                      <Link to={`/teacher-subject-detail/${item.classToSubjectId}`} onClick={() => storeActions.setTeacherSubjectList([])}>
                        {item.subject.name} - {item.classRoom.name}
                      </Link>
                    </Table.Cell>
                    <Table.Cell width="2">
                      {item.kkm}
                    </Table.Cell>
                    <Table.Cell width="3">
                      {item.year}
                    </Table.Cell>
                    <Table.Cell>
                      <Button color='red' basic onClick={() => this._handleDelete(item.classToSubjectId)}>
                        <Icon name='trash' />
                    Hapus
                  </Button>
                    </Table.Cell>
                  </Table.Row>
                )
              })}
            </Table.Body>
          </Table>
          {selectedTeacher.classToSubjects.length < 1 && <h4>Data kosong.</h4>}
          <Link to={`/teacher`}>
            <Button color='olive' size='small'>
              Back
          </Button>
          </Link>
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

  _handleDelete = (classToSubjectId) => {
    let teacherID = this.props.match.params.id;
    let { isError } = getAllState();
    storeActions.setModalStatus(true);
    storeActions.setDialogTitle("Hapus data");
    storeActions.setDialogMessage("Anda yakin akan menghapus data ini?");
    storeActions.setModalConfirmAction(() => {
      deleteTeacherClass(classToSubjectId).then(() => {
        isError && storeActions.setIsError(false);
        getTeacherByID(teacherID);
        storeActions.setModalStatus(false);
      });
    });
  }
}
