import React, { Component } from 'react'
import {
  Grid,
  Button,
  Table,
  Form,
  Icon,
} from 'semantic-ui-react';
import {getExamByID, postStudentsPoint} from './api-data/exam';
import {
  Link
} from "react-router-dom";
import { storeActions, chainToView } from '../store/Store.js';
import initialState from '../store/state.js';
import {isEqual} from '../utils/objectUtils';
import {getDateByStringJSON} from '../utils/dateHelper';

class TeacherExamDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedExam: {students: []},
      studentPoints: [],
      examPoints: [],
    }
  }

  render() {
    let {selectedExam, studentPoints} = this.state;
    let examID = this.props.match.params.id;
    return (
      <div>
        <Grid.Column stretched width={12}>
        <h1>Detail Exam: {selectedExam.name}</h1>
        <p>
          Kelas: <b>{selectedExam.classRoomName}</b><br />
          Matapelajaran: <b>{selectedExam.subjectName}</b><br />
          Guru: <b>{selectedExam.teacherName}</b><br />
          Tanggal: <b>{getDateByStringJSON(selectedExam.date).dateIDN}</b>
        </p>

        <h3>Daftar Siswa:</h3>
        <Table celled selectable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>No</Table.HeaderCell>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Nilai</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {selectedExam.students.map((item, key) => {
              return (
                <Table.Row key={key}>
                  <Table.Cell>{key+1}</Table.Cell>
                  <Table.Cell width="5">{item.studentName}</Table.Cell>
                  <Table.Cell>
                    <Form.Input fluid placeholder='Nilai siswa'
                      defaultValue={this._getCurrentPoint(item)}
                      onChange={(e) => this._handleChangePoint(e.target.value, item, key)}
                    />
                  </Table.Cell>
                </Table.Row>
              )
            })}
          </Table.Body>
        </Table>
        <Link to={`/teacher-subject-detail/${selectedExam.teacherSubjectId}`}>
          <Button color='olive' size='small'>
             Back
          </Button>
        </Link>
        <Button color='teal' size='small' disabled={!this._validate()} onClick={() => this._validate() && this._handleSubmit()} >
           Simpan
        </Button>
        {selectedExam.students.length < 1 && <h4>Data kosong.</h4> }
      </Grid.Column>
      </div>
    )
  }

  componentDidMount() {
    let examID = this.props.match.params.id;
    storeActions.setIsError(false);
    storeActions.setSelectedExam(initialState.selectedExam);
    if (examID > 0) {
      getExamByID(examID);
      storeActions.setIsLoading(true);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    let {selectedExam} = this.props;
    if (!isEqual(prevProps.selectedExam, selectedExam)) {
      this.setState({selectedExam});
    }
  }

  _handleChangePoint = (eValue, item, key) => {
    let {studentPoints: pointList} = this.state;

    const itemVal = pointList.find((value) => value.id === item.studentId);
    const point = {id: item.studentId, point: eValue, key};
    if (itemVal) {
      pointList[itemVal.key] = point;
    } else {
      pointList.push(point);
    }

    this.setState({studentPoints: pointList});
  }

  _validate = () => {
    let {studentPoints, selectedExam} = this.state;
    return selectedExam.students.length === studentPoints.length
  }

  _handleSubmit = () => {
    let {studentPoints, selectedExam} = this.state;
    postStudentsPoint({examID: selectedExam.id, studentPoints})
  }

  _getCurrentPoint = (item) => {
    const {selectedExam} = this.state;
    const itemPoint = selectedExam.examPoints.find((value) => value.id === item.studentId);

    return itemPoint ? itemPoint.point : 0;
  }
}

export default chainToView(TeacherExamDetail);
