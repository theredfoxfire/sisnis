import React, { Component } from "react";
import { Grid, Segment, Form, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { getStudentList, setStudentClass } from "./api-data/student";
import { getClassRoomByID } from "./api-data/classRoom";
import { getAllState, storeActions } from "../store/Store.js";
import DropdownSelect from "../uikit/Dropdown";

export default class ClassAddStudent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      student: "",
    };
  }
  render() {
    let { studentList } = getAllState();
    let { student } = this.state;
    let classID = this.props.match.params.id;
    let studentsOptions = [];
    studentList.students.forEach((item, i) => {
      studentsOptions.push({
        key: i,
        text: `No.Induk: ${item.serial}, Nama: ${item.name}`,
        value: item.id,
      });
    });

    return (
      <div>
        <Grid.Column stretched width={12}>
          <h1>Form Tambah Siswa ke dalam Kelas</h1>
          <Form size="large">
            <Segment stacked>
              <h4>Pilih Siswa:</h4>
              <DropdownSelect
                placeholder="Pilih siswa"
                onChange={(e, { value }) => this.setState({ student: value })}
                multiple={false}
                options={studentsOptions}
              />
              <br />
              <Link to={"/class"}>
                <Button color="olive" size="small">
                  Back
                </Button>
              </Link>
              <Link
                to={
                  student !== ""
                    ? `/class-detail/${classID}`
                    : `/class-add-students/${classID}`
                }
              >
                <Button
                  color="teal"
                  size="small"
                  disabled={student === ""}
                  onClick={() => student !== "" && this._handleSubmit()}
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
    storeActions.setIsError(false);
    storeActions.setIsLoading(true);
    getStudentList(1, "", "no");
  }

  _handleSubmit = () => {
    let classID = this.props.match.params.id;
    let { student } = this.state;
    setStudentClass({ student, classID }).then(getClassRoomByID(classID));
  };
}
