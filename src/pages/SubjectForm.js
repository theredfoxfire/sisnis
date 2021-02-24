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
import { getSubjectByID, postSubject, putSubject } from './api-data/subject'
import { getAllState, storeActions } from '../store/Store.js';

export default class SubjectForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      serial: "",
    };
  }
  render() {
    let { selectedSubject } = getAllState();
    let { name, serial } = this.state;
    let serialValue = serial || selectedSubject.serial;
    let nameValue = name || selectedSubject.name;
    let subjectID = this.props.match.params.id;
    return (
      <div>
        <Grid.Column stretched width={12}>
          <h1>Form Mata Pelajaran</h1>
          <Form size='large'>
            <Segment stacked>
              <h4>Kode Mata Pelajaran:</h4>
              <Form.Input fluid placeholder='Nomer Induk Pengajar' defaultValue={serialValue} onChange={(e) => this.setState({ serial: e.target.value, name: name || selectedSubject.name })} />
              <h4>Nama Mata Pelajaran:</h4>
              <Form.Input fluid placeholder='Nama Mata Pelajaran' defaultValue={nameValue} onChange={(e) => this.setState({ name: e.target.value, serial: serial || selectedSubject.serial })} />
              <Link to={"/subject"}>
                <Button color='olive' size='small'>
                  Back
              </Button>
              </Link>
              <Link to={name !== "" ? "/subject" : `/subject-form/${subjectID}`}>
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
    let subjectID = this.props.match.params.id;
    storeActions.setIsError(false);
    if (subjectID > 0) {
      getSubjectByID(subjectID);
      storeActions.setIsLoading(true);
    }
  }

  _handleSubmit = () => {
    let { name, serial } = this.state;
    let subjectID = this.props.match.params.id;
    subjectID > 0 ? putSubject({ name: name, serial: serial }, subjectID) : postSubject({ name: name, serial: serial });
  }

  _validate = () => {
    let { serial, name } = this.state;
    return serial === "" || name === "";
  }
}
