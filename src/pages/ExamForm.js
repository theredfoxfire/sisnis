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
import {getExamByID, postExam, putExam} from './api-data/exam'
import { getAllState, storeActions } from '../store/Store.js';

export default class ExamForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
    };
  }
  render() {
    let {selectedExam} = getAllState();
    let {name} = this.state;
    let nameValue = name || selectedExam.name;
    let examID = this.props.match.params.id;
    let teacherSubject = this.props.match.params.teacherSubject;
    return (
      <div>
        <Grid.Column stretched width={12}>
        <h1>Form Ujian/Ulangan/Tugas</h1>
        <Form size='large'>
          <Segment stacked>

          <h4>Nama Ujian/Ulangan/Tugas:</h4>
          <Form.Input fluid placeholder='Nama Ujian/Ulangan/Tugas'  defaultValue={nameValue} onChange={(e) => this.setState({name: e.target.value})} />
            <Link to={`/teacher-subject-detail/${teacherSubject}`}>
              <Button color='olive' size='small'>
                 Back
              </Button>
            </Link>
            <Link to={name !== "" ? `/teacher-subject-detail/${teacherSubject}` : `/teacher-subject-exam-detail/${examID}/${teacherSubject}`}>
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
      let examID = this.props.match.params.id;
      storeActions.setIsError(false);
      if (examID > 0) {
        getExamByID(examID);
        storeActions.setIsLoading(true);
      }
    }

    _handleSubmit = () => {
      let {name} = this.state;
      let examID = this.props.match.params.id;
      let teacherSubject = this.props.match.params.teacherSubject;
      examID > 0 ? putExam({name: name, teacherSubject}, examID) : postExam({name: name, teacherSubject});
    }

    _validate = () => {
      let {name} = this.state;
      return name === "";
    }
}
