import React, { Component } from 'react'
import {
  Grid,
  Segment,
  Form,
  Button,
} from 'semantic-ui-react'
import Header from '../uikit/Header'
import Menus from '../uikit/Menus'
import Loader from '../uikit/Loader';
import {
  Link
} from "react-router-dom";
import {getStudentByID, postStudent, putStudent} from './api-data/student'
import { getAllState, storeActions } from '../store/Store.js';

export default class StudentForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      serial: "",
    };
  }
  render() {
    let {selectedStudent} = getAllState();
    let {name, serial} = this.state;
    let serialValue = serial || selectedStudent.serial;
    let nameValue = name || selectedStudent.name;
    let studentID = this.props.match.params.id;
    return (
      <div>
      <Header />
      <Grid style={{ marginTop: '2.4em' }}>
        <Menus />
        <Grid.Column stretched width={12}>
        <h1>Form Siswa</h1>
        <Form size='large'>
          <Segment stacked>
            <h4>Nomer Induk Siswa:</h4>
          <Form.Input fluid placeholder='Nomer Induk Siswa' defaultValue={serialValue} onChange={(e) => this.setState({serial: e.target.value, name: name || selectedStudent.name})} />
            <h4>Nama Siswa:</h4>
          <Form.Input fluid placeholder='Nama Siswa'  defaultValue={nameValue} onChange={(e) => this.setState({name: e.target.value, serial: serial || selectedStudent.serial})} />
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
        <Loader />
      </Grid>
      </div>
    )
  }

    componentDidMount() {
      let studentID = this.props.match.params.id;
      storeActions.setIsError(false);
      if (studentID > 0) {
        getStudentByID(studentID);
        storeActions.setIsLoading(true);
      }
    }

    _handleSubmit = () => {
      let {name, serial} = this.state;
      let studentID = this.props.match.params.id;
      studentID > 0 ? putStudent({name: name, serial: serial}, studentID) : postStudent({name: name, serial: serial});
    }

    _validate = () => {
      let {serial, name} = this.state;
      return serial === "" || name === "";
    }
}
