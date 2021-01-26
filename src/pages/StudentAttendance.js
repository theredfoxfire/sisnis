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
import {getScheduleByID} from './api-data/schedule';
import initialState from '../store/state.js';
import styled from 'styled-components';


const Row = styled("div")`
  display: flex;
  flex-direction: row;
`;

const Label = styled("div")`
  width: 120px;
`;


class StudentAttendance extends Component {
  render() {
    let {studentAttendanceList, selectedSchedule} = getAllState();
    return (
      <div>
        <Grid.Column stretched width={12}>
        <h1>Tabel Daftar Hadir Siswa</h1>
        <div>
          <Row><Label>Kelas:</Label> <b>{selectedSchedule.classRoomName}</b></Row>
          <Row><Label>Matapelajaran:</Label> <b>{selectedSchedule.subjectName}</b></Row>
          <Row><Label>Guru:</Label> <b>{selectedSchedule.teacherName}</b></Row>
          <Row><Label>Tanggal:</Label> <b></b></Row>
        </div>
        <Table celled selectable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>No</Table.HeaderCell>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Actions</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {selectedSchedule.students.map((item, key) => {
              return (
                <Table.Row key={key}>
                  <Table.Cell>{key + 1}</Table.Cell>
              <Table.Cell width="6">{item.name}</Table.Cell>
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
    let scheduleId = this.props.match.params.scheduleId;
    storeActions.setIsLoading(true);
    storeActions.setIsError(false);
    getStudentAttendanceList(scheduleId);
    getScheduleByID(scheduleId)
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
