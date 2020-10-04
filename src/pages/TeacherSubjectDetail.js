import React, { Component } from 'react'
import {
  Grid,
  Button,
  Table,
  Icon,
} from 'semantic-ui-react';
import {getTeacherSubject, deleteExam} from './api-data/exam';
import {
  Link
} from "react-router-dom";
import { getAllState, storeActions } from '../store/Store.js';
import {getDateByStringJSON} from '../utils/dateUtils';
import styled from 'styled-components';

const Row = styled("div")`
  display: flex;
  flex-direction: row;
`;

const Label = styled("div")`
  width: 120px;
`;

export default class TeacherSubjectDetail extends Component {

  render() {
    let {teacherSubject} = getAllState();
    let teacherSubjectID = this.props.match.params.id;
    return (
      <div>
        <Grid.Column stretched width={12}>
        <h1>Detail Matapelajaran: {teacherSubject.name}</h1>
        <div>
          <Row><Label>Kelas:</Label> <b>{teacherSubject.className}</b></Row>
          <Row><Label>Guru:</Label> <b>{teacherSubject.teacherName}</b></Row>
        </div>

      <h3>Daftar tugas/ulangan/ujian untuk matapelajaran ini:</h3>
        <Link to={`/teacher-add-subject-exam/0/${teacherSubjectID}`}>
          <Button color='green' size="small">
            <Icon name='plus' />
          Tambah Ujian/Tugas/Ulangan Lagi
          </Button>
        </Link>
        <Table celled selectable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>No</Table.HeaderCell>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Tanggal Exam</Table.HeaderCell>
              <Table.HeaderCell>Actions</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {teacherSubject.exams.map((item, key) => {
              return (
                <Table.Row key={key}>
                  <Table.Cell>{key+1}</Table.Cell>
                  <Table.Cell width="5">
                    <Link to={`/teacher-subject-exam-detail/${item.id}`}>
                      {item.name}
                    </Link>
                  </Table.Cell>
                  <Table.Cell width="4">
                    {getDateByStringJSON(item.date).dateIDN}
                  </Table.Cell>
                  <Table.Cell>
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
        {teacherSubject.exams.length < 1 && <h4>Data kosong.</h4> }
        <Link to={`/teacher-detail/${teacherSubject.teacherId}`}>
          <Button color='olive' size='small'>
             Back
          </Button>
        </Link>
      </Grid.Column>
      </div>
    )
  }

  componentDidMount() {
    let teacherSubjectID = this.props.match.params.id;
    storeActions.setIsError(false);
    if (teacherSubjectID > 0) {
      getTeacherSubject(teacherSubjectID);
      storeActions.setIsLoading(true);
    }
  }

  _handleDelete = (id) => {
    let teacherSubjectID = this.props.match.params.id;
    let {isError} = getAllState();
    storeActions.setModalStatus(true);
    storeActions.setDialogTitle("Hapus data");
    storeActions.setDialogMessage("Anda yakin akan menghapus data ini?");
    storeActions.setModalConfirmAction(() => {
      deleteExam(id).then(() => {
        isError && storeActions.setIsError(false);
        getTeacherSubject(teacherSubjectID);
        storeActions.setModalStatus(false);
      });
    });
  }
}
