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
import {getTeacherByID, postTeacher, putTeacher} from './api-data/teacher'
import { getAllState, storeActions } from '../store/Store.js';

export default class TeacherForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      serial: "",
    };
  }
  render() {
    let {selectedTeacher} = getAllState();
    let {name, serial} = this.state;
    let serialValue = serial || selectedTeacher.serial;
    let nameValue = name || selectedTeacher.name;
    let teacherID = this.props.match.params.id;
    return (
      <div>
        <Grid.Column stretched width={12}>
        <h1>Form Guru</h1>
        <Form size='large'>
          <Segment stacked>
            <h4>Nomer Induk Pengajar:</h4>
          <Form.Input fluid placeholder='Nomer Induk Pengajar' defaultValue={serialValue} onChange={(e) => this.setState({serial: e.target.value, name: name || selectedTeacher.name})} />
          <h4>Nama Guru:</h4>
          <Form.Input fluid placeholder='Nama Guru'  defaultValue={nameValue} onChange={(e) => this.setState({name: e.target.value, serial: serial || selectedTeacher.serial})} />
            <Link to={"/teacher"}>
              <Button color='olive' size='small'>
                 Back
              </Button>
            </Link>
            <Link to={name !== "" ? "/teacher" : `/teacher-form/${teacherID}`}>
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
      let teacherID = this.props.match.params.id;
      storeActions.setIsError(false);
      if (teacherID > 0) {
        getTeacherByID(teacherID);
        storeActions.setIsLoading(true);
      }
    }

    _handleSubmit = () => {
      let {name, serial} = this.state;
      let teacherID = this.props.match.params.id;
      teacherID > 0 ? putTeacher({name: name, serial: serial}, teacherID) : postTeacher({name: name, serial: serial});
    }

    _validate = () => {
      let {serial, name} = this.state;
      return serial === "" || name === "";
    }
}
