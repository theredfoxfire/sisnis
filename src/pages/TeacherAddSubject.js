import React, { Component } from "react";
import { Grid, Segment, Form, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import {
  getTeacherByID,
  setTeacherClass,
  updateTeacherClass,
} from "./api-data/teacher";
import { getClassRoomList } from "./api-data/classRoom";
import { getSubjectList } from "./api-data/subject";
import { getAcademicYearsList } from "./api-data/academicYear";
import { getAllState, storeActions, chainToView } from "../store/Store.js";
import DropdownSelect from "../uikit/Dropdown";
import { getTeacherSubject } from "./api-data/exam";
import { isEqual } from "../utils/objectUtils";

class TeacherAddSubject extends Component {
  constructor(props) {
    super(props);

    this.state = {
      subject: "",
      classRoom: "",
      year: "",
      kkm: "",
    };
  }
  render() {
    let { classRoomList, subjectList, academicYearsList } = getAllState();
    let teacherID = this.props.match.params.id;
    let { kkm } = this.state;
    let subjectOptions = [];
    subjectList.forEach((item, i) => {
      subjectOptions.push({
        key: i,
        text: item.name,
        value: item.id,
      });
    });
    let yearOptions = [];
    academicYearsList.forEach((item, i) => {
      yearOptions.push({
        key: i,
        text: item.year,
        value: item.yearId,
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
          <Form size="large">
            <Segment stacked>
              <h4>Pilih Matapelajaran:</h4>
              <DropdownSelect
                placeholder="Pilih Matapelajaran"
                onChange={(e, { value }) => this.setState({ subject: value })}
                value={this.state.subject}
                multiple={false}
                options={subjectOptions}
              />
              <h4>Nilai KKM:</h4>
              <Form.Input
                fluid
                placeholder="Nilai KKM"
                defaultValue={kkm}
                onChange={(e) => this.setState({ kkm: e.target.value })}
              />
              <h4>Pilih Kelas:</h4>
              <DropdownSelect
                placeholder="Pilih Kelas"
                value={this.state.classRoom}
                onChange={(e, { value }) => this.setState({ classRoom: value })}
                multiple={false}
                options={classRoomOptions}
              />
              <h4>Pilih Tahun Ajaran:</h4>
              <DropdownSelect
                placeholder="Pilih Tahun Ajaran"
                value={this.state.year}
                onChange={(e, { value }) => this.setState({ year: value })}
                multiple={false}
                options={yearOptions}
              />
              <br />
              <Link to={`/teacher-detail/${teacherID}`}>
                <Button color="olive" size="small">
                  Back
                </Button>
              </Link>
              <Link
                to={
                  !this._validateForm()
                    ? `/teacher-detail/${teacherID}`
                    : `/teacher-add-subject/${teacherID}`
                }
              >
                <Button
                  color="teal"
                  size="small"
                  disabled={this._validateForm()}
                  onClick={() => !this._validateForm() && this._handleSubmit()}
                >
                  Simpan
                </Button>
              </Link>
            </Segment>
          </Form>
        </Grid.Column>
      </div>
    );
  }

  componentDidMount() {
    let teacherSubjectID = this.props.match.params.subjectId;
    if (teacherSubjectID > 0) {
      getTeacherSubject(teacherSubjectID);
    } else {
      getClassRoomList();
      getSubjectList();
      getAcademicYearsList();
    }
    storeActions.setIsError(false);
    storeActions.setIsLoading(true);
  }
  componentDidUpdate(prevProps) {
    let { teacherSubject } = this.props;
    if (!isEqual(prevProps.teacherSubject, teacherSubject)) {
      getClassRoomList();
      getSubjectList();
      getAcademicYearsList();
      this.setState({
        ...this.state,
        subject: teacherSubject.teacherSubjectId,
        classRoom: teacherSubject.classId,
        year: teacherSubject.academicYear,
        kkm: teacherSubject.passingPoint,
      });
    }
  }

  _handleSubmit = () => {
    let { classRoom, subject, year, kkm } = this.state;
    let teacherID = this.props.match.params.id;
    let teacherSubjectID = this.props.match.params.subjectId;
    if (teacherSubjectID > 0) {
      updateTeacherClass({
        subject,
        classRoom,
        teacherID,
        year,
        kkm,
        teacherSubjectID,
      }).then(getTeacherByID(teacherID));
    } else {
      setTeacherClass({ subject, classRoom, teacherID, year, kkm }).then(
        getTeacherByID(teacherID)
      );
    }
  };

  _validateForm = () => {
    let { subject, classRoom, year } = this.state;
    return subject === "" || classRoom === "" || year === "";
  };
}

export default chainToView(TeacherAddSubject);
