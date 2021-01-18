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
import {getStudentByID, postStudent, putStudent} from './api-data/student'
import { getAllState, storeActions, chainToView } from '../store/Store.js';
import {isEqual} from '../utils/objectUtils';
import {getClassRoomList} from './api-data/classRoom';
import DropdownSelect from '../uikit/Dropdown';

class StudentForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      serial: "",
      classRoom: "",
    };
  }
  render() {
    let {selectedStudent, classRoomList} = getAllState();
    let {name, serial, classRoom} = this.state;
    let serialValue = serial || selectedStudent.serial;
    let nameValue = name || selectedStudent.name;
    let classRoomValue = classRoom || selectedStudent.classId;
    let studentID = this.props.match.params.id;
    let classRoomOptions = [];
    classRoomList.forEach((item, i) => {
      classRoomOptions.push({
        key: i,
        text: item.name,
        value: item.id,
      });
    });
    return (
      <div>
        <Grid.Column stretched width={12}>
        <h1>Form Siswa</h1>
        <Form size='large'>
          <Segment stacked>
            <h4>Nomer Induk Siswa:</h4>
          <Form.Input fluid placeholder='Nomer Induk Siswa' defaultValue={serialValue} onChange={(e) => this.setState({serial: e.target.value, name: name || selectedStudent.name})} />
            <h4>Nama Siswa:</h4>
          <Form.Input fluid placeholder='Nama Siswa'  defaultValue={nameValue} onChange={(e) => this.setState({name: e.target.value, serial: serial || selectedStudent.serial})} />
            <h4>Pilih Kelas:</h4>
          <DropdownSelect placeholder="Pilih Kelas" value={classRoomValue} onChange={(e, {value}) => this.setState({classRoom: value})} multiple={false} options={classRoomOptions} />
          <br />
            <Link to={"/student"}>
              <Button color='olive' size='small'>
                 Back
              </Button>
            </Link>
            <Link to={name !== "" ? "/student" : `/student-form/${studentID}`}>
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
      let studentID = this.props.match.params.id;
      storeActions.setIsError(false);
      storeActions.setIsLoading(true);
      getClassRoomList();
      if (studentID > 0) {
        getStudentByID(studentID);
        this._validate();
      }
    }

    componentDidUpdate(prevProps, prevState) {
      let {selectedStudent} = this.props;
      if (!isEqual(prevProps.selectedStudent, selectedStudent)) {
        this.setState({
          name: selectedStudent.name,
          serial: selectedStudent.serial,
          classRoom: selectedStudent.classId,
        });
      }
    }

    _handleSubmit = () => {
      let {name, serial, classRoom} = this.state;
      let studentID = this.props.match.params.id;
      studentID > 0 ? putStudent({name: name, serial: serial, classRoom}, studentID) : postStudent({name: name, serial: serial, classRoom});
    }

    _validate = () => {
      let {serial, name} = this.state;
      return serial === "" || name === "";
    }
}

export default chainToView(StudentForm);
