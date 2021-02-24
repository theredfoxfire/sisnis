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
import { getStudentAttendanceByID, postStudentAttendance, putStudentAttendance } from './api-data/studentAttendance';
import { storeActions, chainToView } from '../store/Store.js';
import { isEqual } from '../utils/objectUtils';
import DropdownSelect from '../uikit/Dropdown';
import { PRSENCE_STATUS } from '../Constants';

class StudentAttendanceForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSubmit: false,
      studentAttendance: {
        student: "",
        schedule: "",
        presenceStatus: "",
        notes: "",
      },
      selectedStudentAttendance: {},
    };
  }
  render() {
    let { studentAttendance } = this.state;
    let studentAttendanceID = this.props.match.params.id;
    let presenceOptions = [];
    PRSENCE_STATUS.forEach((item, i) => {
      presenceOptions.push({
        key: i,
        text: item.label,
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
              <Form.Input fluid placeholder='Matapelajaran ' defaultValue={studentAttendance.schedule.subjectName} disabled="disabled" />
              <h4>Murid :</h4>
              <Form.Input fluid placeholder='Murid ' defaultValue={studentAttendance.student.studentName} disabled="disabled" />
              <h4>Catatan :</h4>
              <Form.Input fluid placeholder='Catatan ' defaultValue={studentAttendance.notes} onChange={(e) => this.setState({ studentAttendance: { ...studentAttendance, notes: e.target.value } })} />
              <h4>Hari :</h4>
              <DropdownSelect value={studentAttendance.prsenceStatus} placeholder="Pilih Status Kehadiran" onChange={(e, { value }) => this.setState({ studentAttendance: { ...studentAttendance, presenceOptions: value } })} multiple={false} options={presenceOptions} />
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
    storeActions.setIsLoading(true);
    if (studentAttendanceID > 0) {
      getStudentAttendanceByID(studentAttendanceID);
      storeActions.setIsLoading(true);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    let { selectedStudentAttendance, isError, isLoading } = this.props;
    let { isSubmit } = this.state;
    if (!isEqual(prevProps.selectedStudentAttendance, selectedStudentAttendance)) {
      this.setState({ studentAttendance: { ...selectedStudentAttendance } });
    }
    if (isError && isSubmit && isLoading) {
      storeActions.setIsLoading(false);
      this.setState({ isSubmit: false });
    }
  }

  _handleSubmit = () => {
    let { studentAttendance } = this.state;
    let studentAttendanceID = this.props.match.params.id;
    storeActions.setIsLoading(true);
    this.setState({ isSubmit: true });
    studentAttendanceID > 0 ? putStudentAttendance({ ...studentAttendance }, studentAttendanceID) : postStudentAttendance({ ...studentAttendance });
  }

  _validate = () => {
    let {
      student,
      schedule,
      presenceStatus,
    } = this.state.studentAttendance;
    return student === "" || schedule === "" || presenceStatus === "";
  }
}

export default chainToView(StudentAttendanceForm);
