import React, { Component } from 'react'
import {
  Grid,
  Segment,
  Form,
  Button,
} from 'semantic-ui-react';
import DropdownSelect from '../uikit/Dropdown';
import {
  Link
} from "react-router-dom";
import {getExamByID, postExam, putExam} from './api-data/exam';
import {getExamTypeList} from './api-data/examType';
import { getAllState, storeActions } from '../store/Store.js';
import SemanticDatepicker from 'react-semantic-ui-datepickers';
import 'react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css';

export default class ExamForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      examType: "",
      examDate: "",
    };
  }
  render() {
    let {selectedExam, examTypeList} = getAllState();
    let {name} = this.state;
    let nameValue = name || selectedExam.name;
    let examID = this.props.match.params.id;
    let teacherSubject = this.props.match.params.teacherSubject;
    let examOptions = [];
    examTypeList.forEach((item, i) => {
      examOptions.push({
        key: i,
        text: item.name,
        value: item.id,
      });
    });
    return (
      <div>
        <Grid.Column stretched width={12}>
        <h1>Form Ujian/Ulangan/Tugas</h1>
        <Form size='large'>
          <Segment stacked>

          <h4>Nama Ujian/Ulangan/Tugas:</h4>
          <Form.Input fluid placeholder='Nama Ujian/Ulangan/Tugas'  defaultValue={nameValue} onChange={(e) => this.setState({name: e.target.value})} />
          <h4>Tanggal Exam</h4>
          <SemanticDatepicker locale="en-US" onChange={(event, data) => this.setState({
            examDate: data.value,
          })} type="basic" />
          <h4>Type Exam</h4>
          <DropdownSelect placeholder="Pilih type exam" onChange={(e, {value}) => this.setState({examType: value})} multiple={false} options={examOptions} />
          <br />
            <Link to={`/teacher-subject-detail/${teacherSubject}`}>
              <Button color='olive' size='small'>
                 Back
              </Button>
            </Link>
            <Link to={!this._validate() ? `/teacher-subject-detail/${teacherSubject}` : `/teacher-subject-exam-detail/${examID}/${teacherSubject}`}>
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
      getExamTypeList();
    }

    _handleSubmit = () => {
      let {name, examType, examDate} = this.state;
      let examID = this.props.match.params.id;
      let teacherSubject = this.props.match.params.teacherSubject;
      examID > 0 ? putExam({name: name, teacherSubject, examType, examDate}, examID) : postExam({name: name, teacherSubject, examType, examDate});
    }

    _validate = () => {
      let {name, examType, examDate} = this.state;
      return name === "" || examType === "" || examDate === "";
    }
}
