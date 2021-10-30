import React, { Component } from "react";
import { Grid, Button, Table, Form } from "semantic-ui-react";
import {
  getExamByID,
  postStudentsPoint,
  putStudentsPoint,
} from "./api-data/exam";
import { Link } from "react-router-dom";
import { storeActions, chainToView, getAllState } from "../store/Store.js";
import initialState from "../store/state.js";
import { isEqual } from "../utils/objectUtils";
import { getDateByStringJSON } from "../utils/dateUtils";
import styled from "styled-components";

const Row = styled("div")`
  display: flex;
  flex-direction: row;
`;

const Label = styled("div")`
  width: 120px;
`;

class TeacherExamDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedExam: { students: [], date: "2020-10-19T17:00:00.000Z" },
      studentPoints: [],
      examPoints: [],
      isEdit: false,
      dialogMessage: "",
    };
  }

  render() {
    let { selectedExam, dialogMessage } = this.state;
    let { isLoading } = getAllState();
    return (
      <div>
        <Grid.Column stretched width={12}>
          <h1>Detail Exam: {selectedExam.name}</h1>
          <div>
            <Row>
              <Label>Kelas:</Label> <b>{selectedExam.classRoomName}</b>
            </Row>
            <Row>
              <Label>Matapelajaran:</Label> <b>{selectedExam.subjectName}</b>
            </Row>
            <Row>
              <Label>Guru:</Label> <b>{selectedExam.teacherName}</b>
            </Row>
            <Row>
              <Label>Tanggal:</Label>{" "}
              <b>{getDateByStringJSON(selectedExam.date).dateIDN}</b>
            </Row>
          </div>

          <h3>Daftar Siswa:</h3>
          <Table celled selectable>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>No</Table.HeaderCell>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Nilai</Table.HeaderCell>
                <Table.HeaderCell>Catatan</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {selectedExam.students.map((item, key) => {
                return (
                  <Table.Row key={key}>
                    <Table.Cell>{key + 1}</Table.Cell>
                    <Table.Cell width="5">{item.studentName}</Table.Cell>
                    <Table.Cell>
                      <Form.Input
                        fluid
                        placeholder="Nilai siswa"
                        defaultValue={this._getCurrentPoint(item)}
                        onChange={(e) =>
                          this._handleChangePoint(e.target.value, item, key)
                        }
                      />
                    </Table.Cell>
                    <Table.Cell>
                      <Form.Input
                        fluid
                        placeholder="Catatan"
                        defaultValue={this._getCurrentComment(item)}
                        onChange={(e) =>
                          this._handleChangeComment(e.target.value, item, key)
                        }
                      />
                    </Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table>
          {selectedExam.students.length < 1 && <h4>Data kosong.</h4>}
          <Link to={`/teacher-subject-detail/${selectedExam.teacherSubjectId}`}>
            <Button color="olive" size="small">
              Back
            </Button>
          </Link>
          <Button
            color="teal"
            size="small"
            onClick={() => this._handleSubmit()}
          >
            {isLoading ? "Menyimpan..." : "Simpan"}
          </Button>
          {dialogMessage}
        </Grid.Column>
      </div>
    );
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
    let { selectedExam, dialogMessage } = this.props;
    if (!isEqual(prevProps.selectedExam, selectedExam)) {
      let studentPointList = [];
      selectedExam.examPoints.forEach((item, i) => {
        studentPointList.push({
          id: item.id,
          point: item.point,
          key: i,
          pointId: item.pointId,
        });
      });

      this.setState({
        selectedExam,
        studentPoints: studentPointList,
        isEdit: studentPointList.length > 0,
      });
    }
    if (dialogMessage !== prevProps.dialogMessage) {
      this.setState({ dialogMessage: dialogMessage });
    }
  }

  _handleChangePoint = (eValue, item, key) => {
    let { studentPoints: pointList } = this.state;
    const itemVal = pointList.find(
      (value) => value && value.id === item.studentId
    );

    const point = {
      id: item.studentId,
      point: eValue,
      key,
      pointId: itemVal && itemVal.pointId,
    };
    if (itemVal) {
      pointList[itemVal.key] = point;
    } else {
      pointList[key] = point;
    }
    this.setState({ studentPoints: pointList });
  };

  _handleChangeComment = (eValue, item, key) => {
    let { studentPoints: pointList } = this.state;
    const itemVal = pointList.find(
      (value) => value && value.id === item.studentId
    );

    const point = {
      id: item.studentId,
      point: itemVal.point ?? 0,
      comment: eValue,
      key,
      pointId: itemVal && itemVal.pointId,
    };
    if (itemVal) {
      pointList[itemVal.key] = point;
    } else {
      pointList[key] = point;
    }
    this.setState({ studentPoints: pointList });
  };

  _handleSubmit = () => {
    let { studentPoints, selectedExam, isEdit } = this.state;
    storeActions.setDialogMessage("");
    storeActions.setIsLoading(true);
    if (isEdit) {
      putStudentsPoint({ examID: selectedExam.id, studentPoints });
    } else {
      postStudentsPoint({ examID: selectedExam.id, studentPoints });
    }
  };

  _getCurrentPoint = (item) => {
    const { selectedExam } = this.state;
    const itemPoint = selectedExam.examPoints.find(
      (value) => value && value.id === item.studentId
    );

    return itemPoint ? itemPoint.point : 0;
  };

  _getCurrentComment = (item) => {
    const { selectedExam } = this.state;
    const itemPoint = selectedExam.examPoints.find(
      (value) => value && value.id === item.studentId
    );

    return itemPoint ? itemPoint.comment : "";
  };
}

export default chainToView(TeacherExamDetail);
