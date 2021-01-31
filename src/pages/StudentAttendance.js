import React, { Component } from 'react'
import {
  Grid,
  Button,
  Table,
  Radio,
  Form,
} from 'semantic-ui-react';
import {
  Link
} from "react-router-dom";
import { getAllState, storeActions, chainToView } from '../store/Store.js';
import {getStudentAttendanceList, postStudentAttendance} from './api-data/studentAttendance';
import {getScheduleByID} from './api-data/schedule';
import initialState from '../store/state.js';
import styled from 'styled-components';
import SemanticDatepicker from 'react-semantic-ui-datepickers';
import {isEqual} from '../utils/objectUtils';
import {getDateByStringJSON} from '../utils/dateUtils';

const Row = styled("div")`
  display: flex;
  flex-direction: row;
`;

const Label = styled("div")`
  width: 120px;
`;

const RadioOption = styled(Radio)`
  padding: 2px 4px;
  margin: 1px;
  border: solid 1px #bfbebe;
  border-radius: 2px;
`;


class StudentAttendance extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: "",
      studentAttendances: [],
      dialogMessage: "",
    }
  }
  render() {
    let {date, dialogMessage} = this.state;
    let {selectedSchedule, isLoading} = getAllState();
    let scheduleId = this.props.match.params.scheduleId;
    return (
      <div>
        <Grid.Column stretched width={12}>
        <h1>Tabel Daftar Hadir Siswa</h1>
        <div>
          <Row><Label>Kelas:</Label> <b>{selectedSchedule.classRoomName}</b></Row>
          <Row><Label>Matapelajaran:</Label> <b>{selectedSchedule.subjectName}</b></Row>
          <Row><Label>Guru:</Label> <b>{selectedSchedule.teacherName}</b></Row>
          <Row><Label>Tanggal:</Label>
          <SemanticDatepicker locale="en-US" value={date} defaultValue={date} onChange={(event, data) => this.setState({
            date: data.value,
          })} type="basic" /></Row>
        </div>
        <Table celled selectable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>No</Table.HeaderCell>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Kehadiran</Table.HeaderCell>
              <Table.HeaderCell>Catatan</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {selectedSchedule.students.map((item, key) => {
              const status = this._getCurrentStatus(item);
              return (
              <Table.Row key={key}>
              <Table.Cell width="1">{key + 1}</Table.Cell>
              <Table.Cell width="2">{item.name}</Table.Cell>
              <Table.Cell width="5">
                            <RadioOption
                               label='Hadir'
                               name={'presenceStatus'+key}
                               value='PRESENT'
                               checked={status.presenceStatus === 'PRESENT'}
                               onChange={() => this._handleSetPresence('PRESENT', item, key, status.notes)}
                             />
                          <RadioOption
                             label='Ijin'
                             name={'presenceStatus'+key}
                             value='PERMIT'
                             checked={status.presenceStatus === 'PERMIT'}
                             onChange={() => this._handleSetPresence('PERMIT', item, key, status.notes)}
                           />
                          <RadioOption
                             label='Sakit'
                             name={'presenceStatus'+key}
                             value='SICK'
                             checked={status.presenceStatus === 'SICK'}
                             onChange={() => this._handleSetPresence('SICK', item, key, status.notes)}
                           />
                        <RadioOption
                           label='Tanpa Keterangan'
                           name={'presenceStatus'+key}
                           value='NO_NOTICE'
                           checked={status.presenceStatus === 'NO_NOTICE'}
                           onChange={() => this._handleSetPresence('NO_NOTICE', item, key, status.notes)}
                         />
              </Table.Cell>
              <Table.Cell width="6">
              <Form.Input fluid placeholder='Catatan'
                defaultValue={status.notes}
                onChange={(e) => this._handleSetPresence(status.presenceStatus, item, key, e.target.value)}
              />
              </Table.Cell>

                </Table.Row>
              )
            })}
          </Table.Body>
        </Table>
        <Link to={`/studentAttendance/${scheduleId}`}>
          <Button color='olive' size='small' onClick={() => storeActions.setStudentAttendanceList(initialState.studentAttendanceList)}>
             Back
          </Button>
        </Link>
        <Button disabled={date === ""} color='teal' size='small' onClick={() => this._handleSubmit()} >
           {isLoading ? "Prosessing..." : "Simpan"}
        </Button>
        {dialogMessage}
        </Grid.Column>
      </div>
    )
  }

  componentDidMount() {
    let scheduleId = this.props.match.params.scheduleId;
    let date = this.props.match.params.date;
    storeActions.setIsLoading(true);
    storeActions.setIsError(false);
    getStudentAttendanceList(scheduleId, date);
    getScheduleByID(scheduleId)
  }

  componentDidUpdate(prevProps, prevState) {
    let {studentAttendanceList, selectedSchedule, dialogMessage} = this.props;
    if (!isEqual(prevProps.studentAttendanceList, studentAttendanceList) || !isEqual(prevProps.selectedSchedule, selectedSchedule)) {
      if (studentAttendanceList.length < 1) {
        let presenceList = [];
        selectedSchedule.students.forEach((item, key) => {
          presenceList.push({schedule: selectedSchedule.id, key, student: item.id, notes: '', presenceStatus: "PRESENT"});
        });
        this.setState({studentAttendances: presenceList});
      } else {
        let date = studentAttendanceList[0] ? studentAttendanceList[0].date : "";
        this.setState({studentAttendances: studentAttendanceList, date: getDateByStringJSON(date).newDateObject});
      }
    }

    if (dialogMessage !== prevProps.dialogMessage) {
      this.setState({dialogMessage: dialogMessage});
    }
  }

  _handleSetPresence = (status, item, key, notes) => {
    let {studentAttendances} = this.state;
    let {selectedSchedule} = getAllState();
    const itemVal = studentAttendances.find((value) => value && value.student === item.id);

    const presence = {schedule: selectedSchedule.id, key, student: item.id, notes, presenceStatus: status};
    if (itemVal) {
      studentAttendances[presence.key] = {...itemVal, presenceStatus: status, notes};
    } else {
      studentAttendances[key] = presence;
    }
    this.setState({studentAttendances: studentAttendances});
  }

  _getCurrentStatus(item) {
    const {studentAttendances} = this.state;
    const status = studentAttendances.find((value) => value && value.student === item.id);
    return status ? status : {};
  }

  _handleSubmit = () => {
    const {studentAttendances, date} = this.state;
    const scheduleId = this.props.match.params.scheduleId;
    storeActions.setDialogMessage("");
    storeActions.setIsLoading(true);
    const formData = {studentAttendances, date: date.toJSON(), scheduleId};
    console.log(formData);
    postStudentAttendance(formData);
  }
}

export default chainToView(StudentAttendance);
