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
import {getStudentAttendanceList} from './api-data/studentAttendance';
import initialState from '../store/state.js';
import {getDateByStringJSON} from '../utils/dateUtils';

class StudentAttendanceDateList extends Component {
  render() {
    let {studentAttendanceList} = getAllState();
    let scheduleId = this.props.match.params.scheduleId;
    return (
      <div>
        <Grid.Column stretched width={12}>
        <h1>Tabel Rekap Kehadiran</h1>
        <Link onClick={() => window.location.assign(`/studentAttendance/${scheduleId}/new`)}>
          <Button color='green' size="small">
            <Icon name='plus' />
            Tambah
          </Button>
        </Link>
        <Table celled selectable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>No</Table.HeaderCell>
              <Table.HeaderCell>Tanggal Absensi</Table.HeaderCell>
              <Table.HeaderCell>Actions</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {studentAttendanceList.map((item, key) => {
              return (
                <Table.Row key={key}>
                  <Table.Cell>{key + 1}</Table.Cell>
              <Table.Cell width="6">{getDateByStringJSON(item.date).dateIDN}</Table.Cell>
                  <Table.Cell>
                  <Link to={`/studentAttendance/${item.schedule}/${item.date}`}>
                  <Button color='green' basic onClick={() => storeActions.setStudentAttendanceList(initialState.studentAttendanceList)}>
                    <Icon name='pencil' />
                    Edit
                  </Button>
                  </Link>
                  </Table.Cell>
                </Table.Row>
              )
            })}
          </Table.Body>
        </Table>
        <Link to={`/studentAttendance`}>
          <Button color='olive' size='small' onClick={() => storeActions.setStudentAttendanceList(initialState.studentAttendanceList)}>
             Back
          </Button>
        </Link>
        </Grid.Column>
      </div>
    )
  }

  componentDidMount() {
    let scheduleId = this.props.match.params.scheduleId;
    storeActions.setIsLoading(true);
    storeActions.setIsError(false);
    getStudentAttendanceList(scheduleId);
  }
}

export default chainToView(StudentAttendanceDateList);
