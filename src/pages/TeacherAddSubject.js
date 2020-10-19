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
import {getTeacherByID, setTeacherClass} from './api-data/teacher';
import {getClassRoomList} from './api-data/classRoom';
import {getSubjectList} from './api-data/subject';
import { getAllState, storeActions } from '../store/Store.js';
import DropdownSelect from '../uikit/Dropdown';

export default class TeacherAddSubject extends Component {
  constructor(props) {
    super(props);

    this.state = {
      subject: "",
      classRoom: "",
    };
  }
  render() {
    let {classRoomList, subjectList} = getAllState();
    let teacherID = this.props.match.params.id;
    let subjectOptions = [];
    subjectList.forEach((item, i) => {
      subjectOptions.push({
        key: i,
        text: item.name,
        value: item.id,
      });
    });
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
        <h1>Form Tambah Matapelajaran kepada Guru</h1>
        <Form size='large'>
          <Segment stacked>
            <h4>Pilih Matapelajaran:</h4>
          <DropdownSelect placeholder="Pilih Matapelajaran" onChange={(e, {value}) => this.setState({subject: value})} multiple={false} options={subjectOptions} />
            <h4>Pilih Kelas:</h4>
          <DropdownSelect placeholder="Pilih Kelas" onChange={(e, {value}) => this.setState({classRoom: value})} multiple={false} options={classRoomOptions} />
          <br/>
            <Link to={`/teacher-detail/${teacherID}`}>
              <Button color='olive' size='small'>
                 Back
              </Button>
            </Link>
            <Link to={!this._validateForm() ? `/teacher-detail/${teacherID}` : `/teacher-add-subject/${teacherID}`}>
              <Button color='teal' size='small' disabled={this._validateForm()} onClick={() => !this._validateForm() && this._handleSubmit()}>
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
    storeActions.setIsError(false);
    storeActions.setIsLoading(true);
    getClassRoomList();
    getSubjectList();
  }

  _handleSubmit = () => {
    let {classRoom, subject} = this.state;
    let teacherID = this.props.match.params.id;
    setTeacherClass({subject, classRoom, teacherID}).then(getTeacherByID(teacherID));
  }

  _validateForm = () => {
    let {subject, classRoom} = this.state;
    return subject === "" || classRoom === "";
  }
}
