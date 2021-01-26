import React, { Component } from 'react'
import {
  Grid,
  Segment,
  Form,
  Button,
} from 'semantic-ui-react';
import {
  Link
} from "react-router-dom";
import {getStudentAttendanceByID, postStudentAttendance, putStudentAttendance} from './api-data/studentAttendance';
import {getTeacherSubjectList} from './api-data/teacher';
import {getRoomList} from './api-data/room';
import {getTimeSlotList} from './api-data/timeSlot';
import {storeActions, chainToView, getAllState } from '../store/Store.js';
import {isEqual} from '../utils/objectUtils';
import DropdownSelect from '../uikit/Dropdown';
import {DAY_LIST} from '../Constants';

class StudentAttendanceForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSubmit: false,
      studentAttendance: {
        time: "",
        room: "",
        subject: "",
        day: "",
      },
      selectedStudentAttendance: {},
    };
  }
  render() {
    let {studentAttendance} = this.state;
    let {roomList, timeSlotList, teacherSubjectList} = getAllState();
    let studentAttendanceID = this.props.match.params.id;
    let teacherSubjectOptions = [];
    let roomOptions = [];
    let timeSlotOptions = [];
    let dayOptions = [];
    teacherSubjectList.forEach((item, i) => {
      teacherSubjectOptions.push({
        key: i,
        text: `${item.subject.name} - ${item.classRoom.name} - ${item.teacher.name}`,
        value: item.id,
      });
    });
    roomList.forEach((item, i) => {
      roomOptions.push({
        key: i,
        text: `${item.name}`,
        value: item.id,
      });
    });
    timeSlotList.forEach((item, i) => {
      timeSlotOptions.push({
        key: i,
        text: `${item.time}`,
        value: item.id,
      });
    });
    DAY_LIST.forEach((item, i) => {
      dayOptions.push({
        key: i,
        text: item.day,
        value: item.id,
      });
    });
    return (
      <div>
        <Grid.Column stretched width={12}>
        <h1>Form Jadwal</h1>
        <Form size='large'>
          <Segment stacked>
          <h4>Matapelajaran :</h4>
          <DropdownSelect value={studentAttendance.subject} placeholder="Pilih Matapelajaran" onChange={(e, {value}) => this.setState({studentAttendance: {...studentAttendance, subject: value}})} multiple={false} options={teacherSubjectOptions} />
          <h4>Ruangan :</h4>
          <DropdownSelect value={studentAttendance.room} placeholder="Pilih Ruangan" onChange={(e, {value}) => this.setState({studentAttendance: {...studentAttendance, room: value}})} multiple={false} options={roomOptions} />
          <h4>Slot waktu :</h4>
          <DropdownSelect value={studentAttendance.time} placeholder="Pilih Slot Waktu" onChange={(e, {value}) => this.setState({studentAttendance: {...studentAttendance, time: value}})} multiple={false} options={timeSlotOptions} />
          <h4>Hari :</h4>
          <DropdownSelect value={studentAttendance.day} placeholder="Pilih Hari" onChange={(e, {value}) => this.setState({studentAttendance: {...studentAttendance, day: value}})} multiple={false} options={dayOptions} />
          <br />
            <Link to={"/studentAttendance"}>
              <Button color='olive' size='small'>
                 Back
              </Button>
            </Link>
            <Link to={`/studentAttendance-form/${studentAttendanceID}`}>
              <Button color='teal' size='small' disabled={this._validate()} onClick={() => !this._validate() && this._handleSubmit()} >
                 Simpan
              </Button>
            </Link>
          </Segment>
        </Form>
        </Grid.Column>
      </div>
    )
  }

    componentDidMount() {
      let studentAttendanceID = this.props.match.params.id;
      storeActions.setIsError(false);
      getTeacherSubjectList();
      getTimeSlotList();
      storeActions.setIsLoading(true);
      getRoomList();
      if (studentAttendanceID > 0) {
        getStudentAttendanceByID(studentAttendanceID);
        storeActions.setIsLoading(true);
      }
    }

    componentDidUpdate(prevProps, prevState) {
      let {selectedStudentAttendance, isError, isLoading} = this.props;
      let {isSubmit} = this.state;
      if (!isEqual(prevProps.selectedStudentAttendance, selectedStudentAttendance)) {
        this.setState({studentAttendance: {...selectedStudentAttendance}});
      }
      if (isError && isSubmit && isLoading) {
        storeActions.setIsLoading(false);
        this.setState({isSubmit: false});
      }
    }

    _handleSubmit = () => {
      let {studentAttendance} = this.state;
      let studentAttendanceID = this.props.match.params.id;
      storeActions.setIsLoading(true);
      this.setState({isSubmit: true});
      studentAttendanceID > 0 ? putStudentAttendance({...studentAttendance}, studentAttendanceID) : postStudentAttendance({...studentAttendance});
    }

    _validate = () => {
      let {time, day, room, subject} = this.state.studentAttendance;
      return time === "" || day === "" || room === "" || subject === "";
    }
}

export default chainToView(StudentAttendanceForm);
